import mongoose from "mongoose"


export default async function connection(){
    const url = "mongodb+srv://mnmongodb:mnmongodb07+@cluster0.ajkxoti.mongodb.net/plataforma"
    await mongoose.connect(url);
}


