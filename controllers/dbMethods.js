const knex = require("knex");
const knexProductsConfig = require("../db/knexfile.js");
const database = knex(knexProductsConfig);
const fs = require("fs");

class dbMethods {
  constructor(table) {
    this.table = table;
  }

  async save(obj) {
    try {
      await database(this.table).insert(obj);
    } catch (e) {
      console.error(e);
    }
  }

  async getAll() {
    try {
      const cont = await database(this.table).select();
      return cont;
    } catch (e) {
      console.error(e);
    }
  }



  async getById(id) {
    try {
      const cont = await database(this.table).select().where('id', id);
      return cont;
    } catch (e) {  
       console.error(e);
  }
  }


  async deleteAll(){
    try {
     await database(this.table).del();
     return`Se han eliminado todos los elementos de la tabla ${this.table}` 
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(id){
    try {
      await database(this.table).where('id', id).del()
      return`Se ha eliminado el elemento ${id} de la tabla ${this.table}` 
    } catch (e) {
      console.log(e);
    }
  }

  
  async updateById(id,element){
    try {
      await database(this.table).where('id', id).update(element);
      return `Se ha actualizado el elemento ${id} de la tabla ${this.table}`
    } catch (e) {
      console.log(e);
    }
  }
  

  
}

module.exports = dbMethods;
