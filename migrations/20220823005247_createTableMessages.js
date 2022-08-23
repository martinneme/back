/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('mensajes',(table)=>{
        table.increments('id').primary().notNullable();
        table.string('email',320).notNullable();
        table.string('message',500).notNullable();
        table.dateTime('datetime').notNullable();
    
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('mensajes');
};
