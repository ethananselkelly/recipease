const Model = require('./Model')

class Recipe extends Model {
  static get tableName() {
    return "recipes"
  }
}

module.exports = Recipe
