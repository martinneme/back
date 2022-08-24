/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  await knex('productos').del()
  await knex('productos').insert([
    {nombre: 'Mochila',precio:178.45,url:'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-128.png'}
  ]);
};
