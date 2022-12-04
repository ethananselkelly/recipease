const Model = require('./Model')

class ListItem extends Model {
  static get tableName() {
    return "listItems"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "userId", "isChecked"],
      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 },
        userId: { type: ['string', "integer"] },
        isChecked: { type: 'boolean' }
      }
    }
  }

  static get relationMappings() {
    const { User } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "listItems.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = ListItem
