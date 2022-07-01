
const fs = require("fs");
const { type } = require("os");


class Contenedor{
  constructor(pathFile){
    this.pathFile=pathFile;
  }

 async save(obj){
  const content = await this.readFile()
   const cont = await JSON.parse(content)
   cont.length ? obj.id = await this.lastId(): obj.id=1;
   cont.push(obj)
   this.writeFile(JSON.stringify(cont))
}

async lastId(){
  const content = await this.readFile()
   const cont = await JSON.parse(content)
   const ultReg = cont.pop()
    return ultReg.id+1
  }


  async getById(id){
    const content = await this.readFile()
     const cont = await JSON.parse(content)
 const reg=  cont.filter(reg=>reg.id===id)

      return reg.length ? reg : null;
    }

async getAll(){
  const content = await this.readFile()
   const cont = await JSON.parse(content)
   console.log(cont)
}

deleteAll(){
  this.writeFile(JSON.stringify([]))
}


 async readFile(){
  return await fs.promises
    .readFile(this.pathFile, "utf-8")
    .catch((err) => {
      console.error(err);
    });
}

async writeFile(obj){
  return await fs.promises
    .writeFile(this.pathFile, obj)
    .catch((err) => {
      console.error(err);
    });
}

async appendContentFile(content){
  await fs.promises
   .appendFile(this.pathFile, `${content}\n`)
   .then(() => {
     console.log("agregado");
   })
   .catch((err) => {
     console.error(err);
   });
}

}



const test= new Contenedor("contenido.json");
const obj = { title: 'AddTitleTest', price: 63500, thumbnail: 'http://link4' }

// test.save(obj)
//  test.getAll()
// test.deleteAll()
// test.lastId()
 test.getById(2).then(res=>{
  console.log(res)
 })
