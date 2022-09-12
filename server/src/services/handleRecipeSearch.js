import { User } from '../models/index.js'
import RecipeSerializer from '../serializers/RecipeSerializer.js'

const handleRecipeSearch = async (req) => {
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

export default handleRecipeSearch
