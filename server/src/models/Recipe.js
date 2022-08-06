const Model = require('./Model')

class Recipe extends Model {
  static get tableName() {
    return "recipes"
  }

  static get relationMappings() {
    const { User, UserRecipe } = require("./index.js")
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "recipes.id",
          through: {
            from: 'userRecipes.recipeId',
            to: 'userRecipes.userId'
          },
          to: "users.id"
        }
      },
      userRecipes: {
        relation: Model.HasManyRelation,
        modelClass: UserRecipe,
        join: {
          from: 'recipes.id',
          to: 'userRecipes.recipeId'
        }
      }
    }
  }
}

module.exports = Recipe
