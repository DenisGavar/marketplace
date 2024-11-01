/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("vendors", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.string("email").notNullable().unique();
    table.float("rating").defaultTo(0);
    
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("vendors");
};
