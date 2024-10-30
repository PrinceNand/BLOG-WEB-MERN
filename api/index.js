import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import PostRoutes from "./routes/post.routes.js";
import CommentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import path from "path";

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

const __dirname = path.resolve();

const app = express();

// convert coming to express from json
app.use(express.json());
app.use(cookieParser());

// liste to the port
app.listen(3077, () => {
  console.log("Server is Running in Port:3077");
});

// Adding the routes to call api - Test
app.use("/api/user", UserRoutes);

// Adding Auth routes and store user auth data in db
app.use("/api/auth", AuthRoutes);

// Add Post router to handle post related api
app.use("/api/post", PostRoutes);

// Add Comment router to handle comment related api
app.use("/api/comment", CommentRoutes);

// connect all files / routes location in the server
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Middleware to handle all function and error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
