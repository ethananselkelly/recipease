import express from 'express'
import { Recipe, User } from '../../../models/index.js'

const recipesRouter = new express.Router()

recipesRouter.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.query()
    return res.status(200).json({ recipes: recipes })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

export default recipesRouter