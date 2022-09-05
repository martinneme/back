import pkg from 'mongoose';
const {Schema,model} = pkg;


const ProductSchema = new Schema({
  nombre: {type: String, required: true},
  descripcion: {type: String, required: true},
  url: {type: String, required: true},
  codigo: {type: Number, required: true},
  precio: {type:Number, required: true},
  stock: {type:Number, required: true},
}, {timestamps: true});


export const Product = model('productos', ProductSchema);



