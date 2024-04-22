import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";
import BooksRoute from './routes/BookRoute.js'
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(234).send("Welcome To Book Project");
});
app.use('/books',BooksRoute)


mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log("Listening on Port: " + PORT);
    });
  })
  .catch((error) => {
    console.log("ERROR: " + error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
