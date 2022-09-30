import { Recipe } from '../models/index.js'

const handleRecipeForm = async (req) => {
  const { name, image, url } = req.body
  const ingredients = req.body.ingredients.map(({ name }) => name).join('\n')
  const instructions = req.body.ingredients.map(({ name }) => name).join('\n')
  const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, image, url, source: req.user.username })
  await newRecipe.$relatedQuery('users').relate( req.user.id )
}

export default handleRecipeForm
