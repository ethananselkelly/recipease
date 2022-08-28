import { Recipe, UserRecipe } from '../models/index.js'
import RecipeSerializer from '../serializers/RecipeSerializer.js'

const handleGetRecipe = async (req) => {
  const recipeId = req.params.id
  let userId
  let userRecipe
  const recipe = await Recipe.query().findById(recipeId)
    if (req.user) {
      userId = req.user.id
      userRecipe = await UserRecipe.query().findOne({ userId, recipeId })
    }
    const serializedRecipe = RecipeSerializer.getSummary(recipe)
    return { serializedRecipe, userRecipe }
}

export default handleGetRecipe