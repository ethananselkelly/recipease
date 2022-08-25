import { Recipe } from '../models/index.js'
// import recipeScraper from 'recipe-scraper'
import pythonScraper from '../pythonScraper.js'

const handleRecipePost = async (req) => {
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
    // const source = (new URL(url)).hostname.replace('www.', '').replace('.com', '')
    // const recipe = await recipeScraper(url)
    const recipe = await pythonScraper(url)
    console.log(recipe)
    const { name, ingredients, instructions, image, source } = recipe
    const newRecipe = await Recipe.query().insertAndFetch({ name, ingredients, instructions, url, image, source })
    await newRecipe.$relatedQuery('users').relate( req.user.id )
    recipeReturn = newRecipe
  }
  return recipeReturn
}

export default handleRecipePost
