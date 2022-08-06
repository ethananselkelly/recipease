/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const { Recipe, UserRecipe } = require("./index.js")

    return {
      recipes: {
        relation: Model.ManyToManyRelation,
        modelClass: Recipe,
        join: {
          from: "users.id",
          through: {
            from: 'userRecipes.userId',
            to: 'userRecipes.recipeId'
          },
          to: "recipes.id"
        }
      },
      userRecipes: {
        relation: Model.HasManyRelation,
        modelClass: UserRecipe,
        join: {
          from: 'users.id',
          to: 'userRecipes.userId'
        }
      }
    }
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
