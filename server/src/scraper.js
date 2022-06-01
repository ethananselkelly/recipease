import cheerio from 'cheerio'
import got from 'got'

class Scraper {
  static async ethanchlebowski(url) {
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
        if (isNaN(ingredient)) {
          Recipe.ingredients.push(ingredient)
        }
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
  static async joshuaweissman(url) {
    const apiResponse = await got(url)
    const responseBody = apiResponse.body
    
    const $ = cheerio.load(responseBody)
    const $body = $('body')
    const $recipe = $body.find('.rZ4lf')
    const $ingredients = $body.find('ul.public-DraftStyleDefault-ul')
    const $directions = $body.find('ol.public-DraftStyleDefault-ol')
        
    const Recipe = {}
    
    Recipe.name = $recipe.find('span:first.blog-post-title-font').text()
    
    Recipe.ingredients = []
    Recipe.directions = []
    Recipe.url = url
    
    $ingredients.each((index, element) => {
      const ingredientList = $(element).find('li')
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
    console.log(Recipe)
    return Recipe
  }
}
  
export default Scraper
