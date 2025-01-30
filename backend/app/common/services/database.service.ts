import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectToMongo = async (): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const mongodbUri = process.env.MONGODB_URI ||"mongodb://127.0.0.1:27017/graphql";
    if (mongodbUri === "") throw new Error("mongod db uri not found!");
    // mongoose.set("debug", true);
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongodbUri)
      .then(() => {
        console.log("DB Connected!");
        resolve(true);
      })
      .catch(()=>{
        console.log("Cannot connect to the mongodb")
      });
  });
};






