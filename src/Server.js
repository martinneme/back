
const express =require("express") ;
const path = require("path");
const  fileURLToPath =require('url');
const handlebars =  require("express-handlebars");
const HTTPServer =  require('http');
const SocketServer =  require('socket.io');
const knex =  require('knex');
const knexProductsConfig =  require("../knexfile.js");
const FileManager = require('./FileManager')
const routerProducts = require('./routers/routerProducts.js') 


//INICIALIZACION BASE DE DATOS productos
const databaseProducts = knex(knexProductsConfig);

const app = express();

//SOCKETS
const httpServer = new HTTPServer.Server(app);
const socketServer = new SocketServer.Server(httpServer)

app.use(express.static("public"));
app.use(express.json());
app.use(routerProducts);
const PORT = process.env.PORT || 8080;

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, '../views/layouts')
});

const form = {
  title:"titulo",
price:"Precio",
link:"Link",
endpoint:"/productos"
}

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./src/views");



socketServer.on("connection",async (socket)=>{

try{
    socket.emit("INIT",await databaseProducts('mensajes').select());
socket.emit("PRODUCTS",await databaseProducts('productos').select())
}catch{(e)=>{
  console.error("error add"+e);
}};

 
socket.on("PRODUCT_ADDED",async(obj)=>{
  try{
    await databaseProducts('productos').insert(obj)
     socketServer.sockets.emit("PRODUCTS",await databaseProducts('productos').select())
  }catch{(e)=>{
    console.error("error add"+e);
  }};

 
})

  socket.on("POST_MESSAGE",async (msg)=>{
    const dateTime = new Date().toISOString();
    // const month = (dateTime.getMonth() + 1) >9 ?"0"+(dateTime.getMonth() + 1) : (dateTime.getMonth() + 1);
    // const fecha = dateTime.getDate() + '-' + month + '-' + dateTime.getFullYear();
    // const hora = dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
    // const ampm =  dateTime.getHours() >= 12 ? 'PM' : 'AM';
    // const convert = fecha+" "+hora+" "+ampm;
     msg.datetime=dateTime

     databaseProducts('mensajes').insert(msg).then(()=>socketServer.sockets.emit("NEW_MESSAGE",msg));
 
  })


})






const listener = httpServer.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
