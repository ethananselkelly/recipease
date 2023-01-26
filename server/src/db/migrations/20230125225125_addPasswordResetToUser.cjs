/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("users", (table) => {
        table.string('passwordResetToken');
        table.timestamp("passwordResetAt").notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("users", (table) => {
        table.dropColumn("passwordResetToken")
        table.dropColumn("passwordResetAt")
    })
}
