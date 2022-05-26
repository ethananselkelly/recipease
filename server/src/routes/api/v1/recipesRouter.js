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

recipesRouter.get('/:id', async (req, res) =>{
  const recipeIndex = req.params.id
  try {
    console.log('we hit the id backend')
    const recipe = await Recipe.query().findById(recipeIndex)
    return res.status(200).json({ recipe: recipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter