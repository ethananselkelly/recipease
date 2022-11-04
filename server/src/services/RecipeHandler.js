import { User, Recipe, UserRecipe } from '../models/index.js'
import RecipeSerializer from '../serializers/RecipeSerializer.js'
import pythonScraper from './pythonScraper.js'

class RecipeHandler {
  static recipeGet = async (req) => {
    const recipeId = req.params.id
    let userId
    let userRecipe
    const recipe = await Recipe.query().findById(recipeId)
      if (req.user) {
        userId = req.user.id
        userRecipe = await UserRecipe.query().findOne({ userId, recipeId })
      }
      const serializedRecipe = RecipeSerializer.getSummary(recipe)
      return { serializedRecipe, userRecipe }
  }

  static recipeSearch = async (req) => {
    const keyword = req.query.keyword.toLowerCase()
    const user = await User.query().findById(req.user.id)
    const recipes = await user
      .$relatedQuery('recipes')
      .where('name', 'ILike', `%${keyword}%`)
      .orWhere('ingredients', 'ILike', `%${keyword}%`)
      .orWhere('instructions', 'ILike', `%${keyword}%`)
    const serializedRecipes = recipes.map(recipe => RecipeSerializer.getSummary(recipe))
    return {serializedRecipes, keyword}
  }

  static recipeDelete = async (req) => {
    const { id } = req.body
    const deletedRecipe = await Recipe.query().findById( id )
    await deletedRecipe.$relatedQuery('users').unrelate().findById( req.user.id )
    const multipleSaves = await UserRecipe.query().where({ recipeId: id })
    if (!multipleSaves[0]) {
      await Recipe.query().findById( id ).delete()
    }
  }

  static recipeForm = async (req) => {
    const { name, image, url, source } = req.body
    const ingredients = req.body.ingredients.map(({ name }) => name).join('\n')
    const instructions = req.body.instructions.map(({ name }) => name).join('\n')
    const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, image, url, source })
    await newRecipe.$relatedQuery('users').relate( req.user.id )
  }

  static recipeScraper = async (req) => {
    const { body } = req
    const recipeUrl = body.url
    const wildMode = body.wildMode
    let recipeReturn
    const existingRecipe = await Recipe.query().findOne({ url: recipeUrl })
    if (existingRecipe) {
      const existingJoin = await existingRecipe.$relatedQuery('users').findOne({ userId: req.user.id })
      if (!existingJoin) {
        const newJoin = await existingRecipe.$relatedQuery('users').relate( req.user.id )
        recipeReturn = newJoin
      } else {
        recipeReturn = existingJoin
      }
    } else {
      const recipe = await pythonScraper(recipeUrl, wildMode)
      const { name, ingredients, instructions, image, url, source } = recipe
      const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, source, url, image })
      await newRecipe.$relatedQuery('users').relate( req.user.id )
      recipeReturn = newRecipe
    }
    return recipeReturn
  }
}

export default RecipeHandler