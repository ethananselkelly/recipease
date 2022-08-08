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
    user.recipes = await user.$relatedQuery('recipes')
    const serializedRecipes = user.recipes.map(recipe => RecipeSerializer.getSummary(recipe))
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
  const url = body.url
  const source = (new URL(url)).hostname.replace('www.', '').replace('.com', '')
  const recipe = await recipeScraper(url)
  const { name, ingredients, instructions, tags, image, description } = recipe
  let newRecipe
  try {
    const existingRecipe = await Recipe.query().findOne({ url: url })
    if (existingRecipe) {
      const existingJoin = await existingRecipe.$relatedQuery('users').findOne({ userId: req.user.id })
      if (!existingJoin) {
        newRecipe = await existingRecipe.$relatedQuery('users').relate( req.user.id )
      }
    } else {
      newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, notes: description, url, image, tags, source })
      await newRecipe.$relatedQuery('users').relate( req.user.id )
    } 
    return res.status(201).json({ recipe: newRecipe })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.delete('/', async (req, res) => {
  const { id } = req.body
  try {
    const deletedRecipe = await Recipe.query().findById( id )
    await deletedRecipe.$relatedQuery('users').unrelate().findById( req.user.id )
    return res.status(200).json({ deletedRecipe })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter
