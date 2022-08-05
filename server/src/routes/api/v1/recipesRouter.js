import express from 'express'
import objection from 'objection'
import { Recipe, User } from '../../../models/index.js'
import recipeScraper from 'recipe-scraper'
import RecipeSerializer from '../../../serializers/RecipeSerializer.js'

const { ValidationError } = objection

const recipesRouter = new express.Router()

recipesRouter.get('/', async (req, res) => {
  const user = await User.query().findById(req.user.id)
  try {
    const recipes = await user.$relatedQuery('recipes')
    const serializedRecipes = recipes.map(recipe => RecipeSerializer.getSummary(recipe))
    return res.status(200).json({ recipes: serializedRecipes })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

recipesRouter.get('/:id', async (req, res) =>{
  const recipeIndex = req.params.id
  try {
    const recipe = await Recipe.query().findById(recipeIndex)
    const serializedRecipe = RecipeSerializer.getSummary(recipe)
    return res.status(200).json({ recipe: serializedRecipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.post('/', async (req, res) => {
  const { body } = req
  const userId = req.user.id
  const url = body.url
  const source = (new URL(url)).hostname.replace('www.', '').replace('.com', '')
  const recipe = await recipeScraper(url)
  const { name, ingredients, instructions, tags, image, description } = recipe
  
  try {
    console.log(recipe)
    const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, notes: description, userId, url, image, tags, source })
    return res.status(201).json({ recipe: newRecipe })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter