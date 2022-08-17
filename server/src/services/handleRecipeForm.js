import { Recipe } from '../models/index.js'

const handleRecipeForm = async (req) => {
  const source = req.user.username
  const { body } = req
  const { name, notes, image } = body
  const ingredients = body.ingredients.map(({ name }) => name)
  const instructions = body.instructions.map(({ name }) => name)
  const tags = body.tags.split(',')
  const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, notes, image, tags, source })
  await newRecipe.$relatedQuery('users').relate( req.user.id )
  return newRecipe
}

export default handleRecipeForm