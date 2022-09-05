import ContainerDB from "../controllers/containerDB.js"
import { Product } from "../schemas/productos.js";


export default class productContainer extends ContainerDB {
  constructor() {
    super(Product);
  }

  async saveProd(req, res){
    const { nombre, descripcion,codigo,url,stock,precio } = req.body;
    const prod = new Product({
      nombre: nombre, 
      descripcion: descripcion,
      codigo:codigo,
      url:url,
      stock:stock,
      precio:precio
    });
    const result = await prod.save();
    res.json(result);
  };
  
  async  updateProductById(req, res){
    let id = req.params.id;
    id = Types.ObjectId(id);
  const {nombre,descripcion,precio,stock,url,codigo} = req.body
  
  
    const prod = await this.collection.findOne({_id: id});
  
    if (prod) {
      if (nombre  && prod.nombre != nombre)
        prod["nombre"] = nombre;
      if (descripcion  && prod.descripcion != descripcion)
        prod["descripcion"] = descripcion;
      if (codigo && prod.codigo != codigo)
        prod["codigo"] = codigo;
      if (url && prod.url != url) prod["url"] = url;
      if (precio && prod.precio != precio)
        prod["precio"] = precio;
      if (stock  && prod.stock != stock)
        prod["stock"] = stock;
    }
  
    const result = await prod.save();
    res.json(result);
  };

  async getAllProds(req,res){
    return await super.getAll(req,res)
  }

 async getProdById(req,res){
    return await this.super.getById(req,res)
  }

  async deleteProdById(req,res){
    return await super.deleteById(req,res);
  }
}
