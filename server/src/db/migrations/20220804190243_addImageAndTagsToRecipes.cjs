/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('recipes', (table) => {
    table.string("image")
    table.specificType("tags", "text ARRAY")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("recipes", (table) => {
    table.dropColumn("image")
    table.dropColumn("tags")
  })
}
