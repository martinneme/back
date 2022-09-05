import pkg from "mongoose";
const { Types } = pkg;

export default class ContainerDB {
  constructor(collection) {
    this.collection = collection;
  }

  async getAll(req, res) {
    try {
      console.log(collection)
      const result = await this.collection.find({});
      console.log(result)
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getById(req, res) {
    let id = req.params.id;
    id = Types.ObjectId(id);
    const result = await this.collection.findOne({ _id: id });
    res.json(result);
  }

  async deleteById(req, res) {
    let id = req.params.id;
    id = Types.ObjectId(id);
    const resuult = await this.collection.deleteOne({ _id: id });
    res.json(resuult);
  }
}

// export{getAllProds,saveProduct,updateById,deleteById,getById}
