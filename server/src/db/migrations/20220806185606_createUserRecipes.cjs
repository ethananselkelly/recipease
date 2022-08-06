/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('userRecipes', (table) => {
    table.bigIncrements('id').primary()
    table.bigInteger('userId')
      .notNullable()
      .unsigned()
      .index()
      .references('users.id')
    table.bigInteger('recipeId')
      .notNullable()
      .unsigned()
      .index()
      .references('recipes.id')
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('userRecipes')
}
