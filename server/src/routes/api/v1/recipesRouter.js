import express from 'express'
import objection from 'objection'
import { Recipe, User } from '../../../models/index.js'
import RecipeSerializer from '../../../serializers/RecipeSerializer.js'
import handleRecipeScraper from '../../../services/handleRecipeScraper.js'
import handleRecipeSearch from '../../../services/handleRecipeSearch.js'
import handleGetRecipe from '../../../services/handleGetRecipe.js'
import handleDeleteRecipe from '../../../services/handleDeleteRecipe.js'
import handleRecipeForm from '../../../services/handleRecipeForm.js'

const { ValidationError } = objection

const recipesRouter = new express.Router()

recipesRouter.get('/', async (req, res) => {
  const user = await User.query().findById(req.user.id)
  try {
    user.recipes = await user.$relatedQuery('recipes').orderBy('createdAt', 'desc')
    const serializedRecipes = user.recipes.map(recipe => RecipeSerializer.getSummary(recipe))
    return res.status(200).json({ recipes: serializedRecipes })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.get('/home', async (req, res) => {
  try {
    const randomRecipes = await Recipe.query().whereNot({image: ''}).limit(9).orderByRaw('RANDOM()')
    const serializedRecipes = randomRecipes.map(recipe => RecipeSerializer.getSummary(recipe))
    return res.status(200).json({ recipes: serializedRecipes })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.get('/search', async (req, res) => {
  try {
    const recipeSearch = await handleRecipeSearch(req)
    const { serializedRecipes, keyword } = recipeSearch
    return res.status(200).json({ recipes: serializedRecipes, returnedKeyword:keyword })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.get('/:id', async (req, res) =>{
  try {
    const recipeGet = await handleGetRecipe(req)
    const { serializedRecipe, userRecipe } = recipeGet
    return res.status(200).json({ recipe: serializedRecipe, userRecipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.post('/', async (req, res) => {
  try {
    const recipeReturn = await handleRecipeScraper(req)
    return res.status(201).json({ recipe: recipeReturn })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.post('/form', async (req, res) => {
  try {
    const newRecipe = await handleRecipeForm(req)
    return res.status(201).json({ recipe: newRecipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.post('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.query().findOne({ id: req.body.id })
    const newJoin = await recipe.$relatedQuery('users').relate( req.user.id )
    return res.status(201).json({ newJoin })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.delete('/', async (req, res) => {
  try {
    const recipeDelete = await handleDeleteRecipe(req)
    return res.status(200).json({ recipeDelete })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter
