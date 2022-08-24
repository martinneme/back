const dotenv = require("dotenv")

dotenv.config();

const DATABASE_HOST = process.env.DB_HOST || "localhost";
const DATABASE_PORT = process.env.DB_PORT || "3306";
const DATABASE_USER = process.env.DB_USER || "root";
const DATABASE_PASSWORD = process.env.DB_PASSWORD || "root_password";
const DATABASE_NAME = process.env.DB_NAME || "plataforma";



const knexProductsConfig ={
    client:'mysql',
  connection: {
    host:DATABASE_HOST,
    port:DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
},
migrations:{
  tableName:'knex_migrations',
  directory:'./db/migrations'
},
seeds:{
  tableName:'knex_seeds',
  directory:'./db/seeds'
}
}

module.exports = knexProductsConfig;