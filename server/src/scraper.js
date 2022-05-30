import cheerio from 'cheerio'
import got from 'got'

const url = 'https://www.ethanchlebowski.com/cooking-techniques-recipes/marinated-salmon-edamame-poke-bowl'
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

console.log(Recipe)
