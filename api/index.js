import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";

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

// Adding the routes to call api - Test
app.use("/api/user", UserRoutes);
