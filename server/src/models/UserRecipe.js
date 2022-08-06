const Model = require('./Model.js')

class UserRecipe extends Model {
  static get tableName() {
    return 'userRecipes'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['recipeId', 'userId'],
      properties: {
        recipeId: {type: ['string', 'integer']},
        userId: {type: ['string', 'integer']}
      }
    }
  }

  static relationMappings() {
    const Recipe = require('./Recipe.js')
    const User = require('./User.js')

    return {
      recipe: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recipe,
        join: {
          from: 'userRecipes.recipeId',
          to: 'recipes.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'userRecipes.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = UserRecipe
