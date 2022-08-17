import express from 'express'
import objection from 'objection'
import { Recipe, User } from '../../../models/index.js'
import RecipeSerializer from '../../../serializers/RecipeSerializer.js'
import handleRecipePost from '../../../services/handleRecipePost.js'
import handleRecipeForm from '../../../services/handleRecipeForm.js'

const { ValidationError } = objection

const recipesRouter = new express.Router()

recipesRouter.get('/', async (req, res) => {
  const user = await User.query().findById(req.user.id)
  try {
    user.recipes = await user.$relatedQuery('recipes').orderBy('name')
    const serializedRecipes = user.recipes.map(recipe => RecipeSerializer.getSummary(recipe))
    return res.status(200).json({ recipes: serializedRecipes })
  } catch (error) {
    return res.status(500).json({ errors: error })
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
  try {
    const recipeReturn = await handleRecipePost(req)
    return res.status(201).json({ recipe: recipeReturn })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.post('/recipe-form', async (req, res) => {
  try {
    const recipeReturn = await handleRecipeForm(req)
    return res.status(201).json({ recipe: recipeReturn})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error  })
  }
})

recipesRouter.delete('/', async (req, res) => {
  const { id } = req.body
  try {
    const deletedRecipe = await Recipe.query().findById( id )
    await deletedRecipe.$relatedQuery('users').unrelate().findById( req.user.id )
    return res.status(200).json({ deletedRecipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter
