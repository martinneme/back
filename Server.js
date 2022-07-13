import FileManager from "./FileManager.js";
import express from "express";

const fileManager = new FileManager("productos.txt");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const welcomeMsj = `<h1 style="color:#0000FF">Bienvenido al server</h1>
                      <p>Este provee un servicio API REST</p>
                      <button onclick="window.location.href='/productos'">Productos</button>
                      <button onclick="window.location.href='/productorandom'">Producto random</button>`;
  res.send(welcomeMsj);
});

app.get("/productos", async (req, res) => {
  let response;
  try {
    response = await fileManager.getAll();
  } catch (e) {
    console.error(e);
  }

  res.json(response);
});

app.get("/productos/:id", async (req, res) => {
  let response;
  try {
    const id = parseInt(req.params.id);
    response = await fileManager.getById(id);
  } catch (e) {
    console.error(e);
  }
  res.json(response);
});

app.post("/productosadd", async (req, res) => {
  let response;
  try {
    const add = req.body;
    response = await fileManager.save(add);
  } catch (e) {
    console.error(e);
  }

  res.json(response);
});

app.put("/productos/update/:id", async (req, res) => {
  let element;
  try {
    const id = parseInt(req.params.id);
    const update = req.body;
    const allElements = await fileManager.getAll();
    element = allElements.find((ele) => ele.id === id);
    if (element) {
      if (update.title && element.title != update.title)
        element["title"] = update.title;
      if (update.price && element.price != update.price)
        element["price"] = update.price;
      if (update.thumbnail && element.thumbnail != update.thumbnail)
        element["thumbnail"] = update.thumbnail;
    }

    fileManager.writeFile(JSON.stringify([...allElements]));
    res.json({
      update: "ok",
      id: req.params.id,
      newElement: element,
    });
  } catch (e) {
    console.error(e);
  }
  console.log(element);
});

app.get("/productoRandom", async (req, res) => {
  let response;
  try {
    let min = 1;
    let max = await fileManager.getLenghtProdArray();

    let id = Math.floor(Math.random() * (max - min + 1) + min);

    response = await fileManager.getById(id);
  } catch (e) {
    console.error(e);
  }
  res.json(response);
});

app.delete("/productos/:id", async (req, res) => {
  let response;
  try {
    const id = parseInt(req.params.id);
    const allElements = await fileManager.getAll();
    const element = allElements.find((ele) => ele.id === id);
    const index = allElements.indexOf(element);
    if (index!=-1) {
      allElements.splice(index, 1);
      fileManager.writeFile(JSON.stringify([...allElements]));
      res.json({
        Delete: "ok",
        id: req.params.id,
        ElementDelete: element,
      });
    }else{
      res.json({
        Delete: `Error, ID: ${id} no existe`,
        id: req.params.id,
        ElementDelete: null,
      });
    }
  } catch (e) {
    console.error(e);
  }
});

const listener = app.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
