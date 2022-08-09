import FileManager from "./FileManager.js";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from "express-handlebars";
import {Server as HTTPServer} from 'http'
import {Server as SocketServer} from 'socket.io'

const fileManager = new FileManager("./db/productos.json");
const messagesFileManager = new FileManager("./db/mensajes.json");

const messages = [];



const __dirname = fileURLToPath(import.meta.url);
const app = express();

//SOCKETS
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer)

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
  socket.emit("INIT",await messagesFileManager.getAll());


socket.emit("PRODUCTS",await fileManager.getAll())
 
socket.on("PRODUCT_ADDED",async(obj)=>{
  await fileManager.save(obj)
  socketServer.sockets.emit("PRODUCTS",await fileManager.getAll())
})

  socket.on("POST_MESSAGE",async (msg)=>{
    const dateTime = new Date();
    const fecha = dateTime.getDate() + '-' + ( dateTime.getMonth() + 1 ) + '-' + dateTime.getFullYear();
    const hora = dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
    msg.dateTime=fecha+" "+hora;
    messages.push(msg);
    await messagesFileManager.save(msg);
    socketServer.sockets.emit("NEW_MESSAGE",msg)
  })




})




const listener = httpServer.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
