/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('mensajes').del()
  await knex('mensajes').insert([
    { email: "carlos@hotmail.com",
    message: "test mensajes guardados get",
    dateTime: "2022-08-22 22:15:43 PM"}
  ]);
};
