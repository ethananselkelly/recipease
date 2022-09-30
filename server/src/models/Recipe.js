const Model = require('./Model')

class Recipe extends Model {
  static get tableName() {
    return "recipes"
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "ingredients", "instructions"],
      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 },
        ingredients: { type: "string" },
        instructions: { type: "string" },
        source: { type: "string", minLength: 1, maxLength: 55 },
        url: { type: "string", maxLength: 255 },
        image: { type: "string", maxLength: 255 }
      }
    }
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
