import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

async function connectMongo(){
    return mongoose.connect(process.env.MONGO_URL).then(() => console.log("Mongodb Connected")).catch((err) => console.log("Error connecting to mongoose: ", err));
}

export { connectMongo }