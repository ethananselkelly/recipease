'use strict'
import pythonBridge from 'python-bridge'

// jsObject.url = 'https://www.seriouseats.com/the-food-lab-southern-fried-chicken-recipe'
const url = 'https://www.allrecipes.com/recipe/220128/chef-johns-buttermilk-fried-chicken/'
// const url = 'https://www.ethanchlebowski.com/cooking-techniques-recipes/street-cart-chicken-amp-yellow-rice?rq=halal'
// jsObject.url = 'https://www.joshuaweissman.com/post/easy-authentic-hawaiian-bbq-at-home-chicken-teriyaki'

const pythonScraper = async (url) => {
  let python = pythonBridge()
  let recipe = {}
  recipe.url = url
  try {
    python.ex`from recipe_scrapers import scrape_me`
    python.ex`scraper = scrape_me(${recipe.url})`
    recipe.name = await python`scraper.title()`
    recipe.ingredients = await python`scraper.ingredients()`
    recipe.instructions = await python`scraper.instructions_list()`
    recipe.image = await python`scraper.image()`
    recipe.source = await python`scraper.host()`
    // recipe.time = await python`scraper.total_time()`
    return recipe
  } catch (error) {
    console.log(error)
  }
  python.end()
}


// async function pyscript(url) {
//   let python = pythonBridge()
//   let jsObject = {}
//   jsObject.url = url
//   try {
//     python.ex`from recipe_scrapers import scrape_me`
//     python.ex`scraper = scrape_me(${jsObject.url})`
//     jsObject.name = await python`scraper.title()`
//     jsObject.ingredients = await python`scraper.ingredients()`
//     jsObject.instructions = await python`scraper.instructions_list()`
//     jsObject.image = await python`scraper.image()`
//     jsObject.host = await python`scraper.host()`
//     jsObject.time = await python`scraper.total_time()`
//     // jsObject.nutrients = await python`scraper.nutrients()`
//     // jsObject.language = await python`scraper.language()`
//     // jsObject.notes = await python`scraper.description()`
//     // jsObject.category = await python`scraper.category()`
//     return jsObject
//   } catch (error) {
//     console.log(error)
//   }
//   python.end();
// }

(async () => {
  const returnObject = await pythonScraper(url)
  console.log(returnObject)
})().catch(error => {
  console.log('error')
  console.error(error)
})

export default pythonScraper
