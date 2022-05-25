const Model = require('./Model')

class Recipe extends Model {
  static get tableName() {
    return "recipes"
  }

  static get relationMappings() {
    const { User } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "recipes.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Recipe
