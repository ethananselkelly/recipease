import cheerio from 'cheerio'
import got from 'got'

class Scraper {
  static async getRecipe(url) {
    const apiResponse = await got(url)
    const responseBody = apiResponse.body
    
    const $ = cheerio.load(responseBody)
    const $body = $('body')
    const $recipe = $body.find('.ccm-wrapper')
    const $ingredients = $body.find('.ccm-section-ingredients')
    const $directions = $body.find('.ccm-section-instructions')
    
    const Recipe = {}
    
    Recipe.name = $recipe.find('.ccm-name').text()
    
    Recipe.ingredients = []
    Recipe.directions = []
    Recipe.url = url
    
    $ingredients.each((index, element) => {
      const ingredientList = $(element).find('span')
      ingredientList.each((index, element) => {
        const ingredient = $(element).text()
        Recipe.ingredients.push(ingredient)
      })
    })
    
    $directions.each((index, element) => {
      const directionList = $(element).find('li')
      directionList.each((index, element) => {
        const direction = $(element).text()
        Recipe.directions.push(direction)
      })
    })

    return Recipe
  }
}

// console.log(Recipe)

export default Scraper
