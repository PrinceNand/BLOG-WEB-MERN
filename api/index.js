import express from "express";

const app = express();

// liste to the port
app.listen(3077, () => {
  console.log("Server is Running in Port:3077");
});
