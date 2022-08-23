/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('productos',(table)=>{
    table.increments('id').primary().notNullable();
    table.string('nombre',255).notNullable();
    table.float('precio',17).notNullable();
    table.string('url',2048).notNullable();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('productos');
};
