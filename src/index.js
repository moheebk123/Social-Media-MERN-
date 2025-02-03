import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import app from "./app.js";

dotenv.config({path: "./.env"});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR : ", error);
    });

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server listening on PORT : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MONGODB CONNECTION ERROR : ", error);
  });

// require("dotenv").config()
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import express from "express";

// const app = express();

// ; (async () => {
//   try {
//     // await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     await mongoose
//       .connect(`mongodb://localhost:27017/Social-Media`)
//       .then(() => {
//         console.log("Connected to MongoDB successfully");
//       })
//       .catch((error) => {
//         console.log("ERROR : ", error);
//       });

//     app.on('error', (error) => {
//       console.log("ERROR : ", error)
//     })

//     // app.listen(process.env.PORT, () => {
//     //   console.log(`App listening on port: ${process.env.PORT}`)
//     // })

//     app.listen(5000, () => {
//       console.log(`App listening on port: 5000`)
//     })

// } catch (error) {
//   console.error("ERROR : ", error);
// }
// })()
