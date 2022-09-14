import { Recipe, UserRecipe } from '../models/index.js'

const handleDeleteRecipe = async (req) => {
  const { id } = req.body
  const deletedRecipe = await Recipe.query().findById( id )
  await deletedRecipe.$relatedQuery('users').unrelate().findById( req.user.id )
  const multipleSaves = await UserRecipe.query().where({ recipeId: id })
  if (!multipleSaves[0]) {
    await Recipe.query().findById( id ).delete()
  }
}

export default handleDeleteRecipe