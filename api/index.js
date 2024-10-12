import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Create Mongo free server and connect to db
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongo DB is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// liste to the port
app.listen(3077, () => {
  console.log("Server is Running in Port:3077");
});
