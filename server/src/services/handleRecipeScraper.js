import { Recipe } from '../models/index.js'
import pythonScraper from '../pythonScraper.js'

const handleRecipeScraper = async (req) => {
  const { body } = req
  const recipeUrl = body.url
  let recipeReturn
  const existingRecipe = await Recipe.query().findOne({ url: recipeUrl })
  if (existingRecipe) {
    const existingJoin = await existingRecipe.$relatedQuery('users').findOne({ userId: req.user.id })
    if (!existingJoin) {
      const newJoin = await existingRecipe.$relatedQuery('users').relate( req.user.id )
      recipeReturn = newJoin
    } else {
      recipeReturn = existingJoin
    }
  } else {
    const recipe = await pythonScraper(recipeUrl)
    const { name, ingredients, instructions, image, url, source } = recipe
    const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, source, url, image })
    await newRecipe.$relatedQuery('users').relate( req.user.id )
    recipeReturn = newRecipe
  }
  return recipeReturn
}

export default handleRecipeScraper
