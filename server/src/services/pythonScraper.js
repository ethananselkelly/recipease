import pythonBridge from 'python-bridge'

const pythonScraper = async (url, wildMode) => {
  let python = pythonBridge()
  let recipe = {}
  recipe.url = url
  python.ex`from recipe_scrapers import scrape_me`
  if (wildMode === true) {
    python.ex`scraper = scrape_me(${recipe.url}, wild_mode=True)`
  } else {
    python.ex`scraper = scrape_me(${recipe.url})`
  }
  try {
    recipe.name = await python`scraper.title()`
    recipe.ingredients = await python`scraper.ingredients()`
    recipe.ingredients = recipe.ingredients.join('\n')
    recipe.instructions = await python`scraper.instructions_list()`
    recipe.instructions = recipe.instructions.join('\n')
    recipe.image = await python`scraper.image()`
    recipe.source = await python`scraper.host()`
    return recipe
  } catch (error) {
    console.log(error)
  }
  python.end()
}

export default pythonScraper
