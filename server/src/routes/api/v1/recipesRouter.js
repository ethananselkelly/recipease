import express from 'express'
import objection from 'objection'
import { Recipe, User } from '../../../models/index.js'
import Scraper from '../../../scraper.js'
const { ValidationError } = objection

const recipesRouter = new express.Router()

recipesRouter.get('/', async (req, res) => {
  const user = await User.query().findById(req.user.id)
  try {
    user.recipes = await user.$relatedQuery('recipes')
    return res.status(200).json({ recipes: user.recipes })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

recipesRouter.get('/:id', async (req, res) =>{
  const recipeIndex = req.params.id
  try {
    const recipe = await Recipe.query().findById(recipeIndex)
    return res.status(200).json({ recipe: recipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.post('/', async (req, res) => {
  const { body } = req
  const userId = req.user.id
  const url = body.url
  const domain = (new URL(url)).hostname.replace('www.', '').replace('.com', '')
  const recipe = await Scraper[domain](url)
  const { name, ingredients, directions } = recipe
  
  try {
    const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, directions, userId, url })
    return res.status(201).json({ recipe: newRecipe })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter