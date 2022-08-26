import pythonBridge from 'python-bridge'

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
    return recipe
  } catch (error) {
    console.log(error)
  }
  python.end()
}

export default pythonScraper
