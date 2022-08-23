
const express =require("express") ;
const path = require("path");
const  fileURLToPath =require('url');
const handlebars =  require("express-handlebars");
const HTTPServer =  require('http');
const SocketServer =  require('socket.io');
const knex =  require('knex');
const knexProductsConfig =  require("../knexfile.js");
const FileManager = require('./FileManager')






const databaseProducts = knex(knexProductsConfig);
// const fileManager = new FileManager("./db/productos.json");
const messagesFileManager = new FileManager("./db/mensajes.json");

const messages = [];



// const __dirname = path.join(__dirname)
const app = express();

//SOCKETS
const httpServer = new HTTPServer.Server(app);
const socketServer = new SocketServer.Server(httpServer)

app.use(express.static("public"));
app.use(express.json());
const routerProducts = express.Router();
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



routerProducts.use(express.urlencoded({ extended: true }));


app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./src/views");



routerProducts.get("/", async (req, res) => {

  res.sendFile(path.join(__dirname, '../../public/index.hbs'));

});



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
    const dateTime = new Date();
    const fecha = dateTime.getDate() + '-' + ( dateTime.getMonth() + 1 ) + '-' + dateTime.getFullYear();
    const hora = dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
    const ampm =  dateTime.getHours() >= 12 ? 'PM' : 'AM';
    msg.dateTime=fecha+" "+hora+" "+ampm;
    console.log(msg.dateTime);
    // messages.push(msg);
    // await messagesFileManager.save(msg);
    await databaseProducts('mensajes').insert(msg);
    socketServer.sockets.emit("NEW_MESSAGE",msg);
  })


})






const listener = httpServer.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
