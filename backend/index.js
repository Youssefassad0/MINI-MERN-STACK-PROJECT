import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(234).send("Welcome To Book Project");
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send All required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
  }
});
app.put('/books/:id',async (req,res)=>{
    try{
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
              message: "Send All required fields: title, author, publishYear",
            });
          }

          const {id} = req.params;
          const result = await Book.findByIdAndUpdate(id,req.body); 
          if(!result){
            return res.status(404).json({message:'Book Not Found'});
          }

    }
    catch(err){
        console.log(err.message);
    }
})


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
