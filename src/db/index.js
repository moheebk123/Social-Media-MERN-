import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      .then(() => {
        console.log("Connected to MongoDB successfully");
        console.log("Database : ", DB_NAME);
      })
      .catch((error) => {
        console.error("MONGODB CONNECTION ERROR : ", error);
      });
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR : ", error);
    process.exit(1);
  }
};
