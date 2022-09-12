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
    table.text("ingredients", "longText").notNullable()
    table.text("instructions", "longText").notNullable()
    table.string('source')
    table.text('url', 'longText')
    table.text('image', 'longText')
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
