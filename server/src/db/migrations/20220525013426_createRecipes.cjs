/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("recipes", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.specificType("ingredients", "text ARRAY").notNullable()
    table.specificType("instructions", "text ARRAY").notNullable()
    table.text("notes", 'longText')
    table.string('source')
    table.text('url', 'longText')
    table.text('image', 'longText')
    table.specificType('tags', 'text ARRAY')
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("recipes")
}
