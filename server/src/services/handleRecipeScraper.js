import { Recipe } from '../models/index.js'
import recipeScraper from 'recipe-scraper'

const handleRecipeScraper = async (req) => {
  const { body } = req
  const url = body.url
  let recipeReturn
  const existingRecipe = await Recipe.query().findOne({ url: url })
  if (existingRecipe) {
    const existingJoin = await existingRecipe.$relatedQuery('users').findOne({ userId: req.user.id })
    if (!existingJoin) {
      const newJoin = await existingRecipe.$relatedQuery('users').relate( req.user.id )
      recipeReturn = newJoin
    } else {
      recipeReturn = existingJoin
    }
  } else {
    const source = (new URL(url)).hostname.replace('www.', '').replace('.com', '')
    const recipe = await recipeScraper(url)
    const { name, ingredients, instructions, tags, image, description } = recipe
    const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, notes: description, url, image, tags, source })
    await newRecipe.$relatedQuery('users').relate( req.user.id )
    recipeReturn = newRecipe
  }
  return recipeReturn
}

export default handleRecipeScraper
