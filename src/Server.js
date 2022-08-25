const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const HTTPServer = require("http");
const SocketServer = require("socket.io");
const routerProducts = require("./routers/routerProducts.js");
const dbmethods = require("../controllers/dbMethods.js");

const dbProd = new dbmethods("productos");
const dbMessages = new dbmethods("mensajes");

const app = express();

//SOCKETS
const httpServer = new HTTPServer.Server(app);
const socketServer = new SocketServer.Server(httpServer);

app.use(express.static("public"));
app.use(express.json());
app.use(routerProducts);
const PORT = process.env.PORT || 8080;

const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index",
  layoutsDir: path.join(__dirname, "../views/layouts"),
});

const form = {
  title: "titulo",
  price: "Precio",
  link: "Link",
  endpoint: "/productos",
};

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./src/views");

socketServer.on("connection", async (socket) => {
  try {
    socket.emit("INIT", await dbMessages.getAll());
    socket.emit("PRODUCTS", await dbProd.getAll());
  } catch {
    (e) => {
      console.error("error add" + e);
    };
  }

  socket.on("PRODUCT_ADDED", async (obj) => {
    try {
     
      await dbProd.save(obj);
      socketServer.sockets.emit("PRODUCTS", await dbProd.getAll());
    } catch {
      (e) => {
        console.error("error add" + e);
      };
    }
  });

  socket.on("POST_MESSAGE", async (msg) => {
    const dateTime = new Date().toISOString();
    msg.datetime = dateTime;
    dbMessages.save(msg)
      .then(() => socketServer.sockets.emit("NEW_MESSAGE", msg));
  });
});

const listener = httpServer.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
