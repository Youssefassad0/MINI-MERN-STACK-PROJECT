import express from 'express';
import { Book } from '../models/BookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: 'All required fields: title, author, publishYear' });
    }

    const newBook = {
      title,
      author,
      publishYear
    };

    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book Not Found' });
    }
    return res.status(200).json(book);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: 'All required fields: title, author, publishYear' });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Book Not Found' });
    }
    return res.status(200).json({ message: 'Book Updated Successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Book Not Found' });
    }
    return res.status(200).json({ message: 'Book Deleted Successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
