'use strict'
import pythonBridge from 'python-bridge'

let python = pythonBridge()
const url = 'https://www.seriouseats.com/the-food-lab-southern-fried-chicken-recipe'

python.ex`from recipe_scrapers import scrape_me`

python.ex`scraper = scrape_me(${url})`


let jsObject = {}
// let instructions
async function pyscript() {
  try {
    jsObject.name = await python`scraper.title()`
    jsObject.instructions = await python`scraper.instructions_list()`
  
  } catch (error) {
    console.log(error)
  }
}

// pyscript()
// console.log(jsObject)

(async () => {
  await pyscript()
  console.log(jsObject)
})().catch(error => {
  console.log('error')
  console.error(error)
})

// console.log(instructions)

python.end();

// console.log(recipe)

  // console.log(python.connected)

    // recipe.recipe = await python.ex`recipe = scrape_me(${url})`
    // console.log(python.connected)
    // console.log(recipe.name)
    // recipe.image = await python`recipe.image()`
    // recipe.source = await python`recipe.host()`
    // recipe.url = url