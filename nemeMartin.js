class usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [libros];
    this.mascotas = mascotas;
  }

  get fullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  get countMascotas() {
    return this.mascotas.length;
  }

  get getBookNames() {
    return this.libros.map((libro) => libro.nombre);
  }

  addMascotas(nombreMascota) {
    this.mascotas.push(nombreMascota);
  }

  addBook(newBook) {
    this.libros.push(newBook);
  }
} 

const user = new usuario(
  "Martin",
  "Neme",
  { nombre: "Harry Potter", autor: "J. K. Rowling" },
  ["nina", "Otto"]
);

console.log(user);

console.log(`Nombre completo: ${user.fullName}
El usuario tiene: ${user.countMascotas} Mascotas
El usuario tiene los libros: ${user.getBookNames}`);

user.addBook({ nombre: "Quijote", autor: "Cervantes" });
user.addMascotas("Gato");

console.log("______________AFTER__________________");
console.log(user);
console.log(`Nombre completo: ${user.fullName}
El usuario tiene: ${user.countMascotas} Mascotas
El usuario tiene los libros: ${user.getBookNames}`);
