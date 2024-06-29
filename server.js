    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();
    const port = 3000;

    // Middleware
    app.use(bodyParser.json());
    app.use(cors());

    app.use(express.static(__dirname));

    app.listen(process.env.PORT);



    // MongoDB connection


    mongoose.connect('mongodb://localhost:27017/mydatabase');


    const bookSchema = new mongoose.Schema({
        title: String,
        author: String,
        description: String,
    });

    const Book = mongoose.model('Book', bookSchema);

    // Routes
    app.get('/api/books', async (req, res) => {
        try {
            const books = await Book.find();
            res.json(books);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post('/api/books', async (req, res) => {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
        });

        try {
            const savedBook = await book.save();
            res.status(201).json(savedBook);
        } catch (err) {
            res.status(400).send(err);
        }
    });

    app.get('/api/books/search', async (req, res) => {
        const { title, author } = req.query;
        try {
            const books = await Book.find({
                $or: [
                    { title: { $regex: title, $options: 'i' } },
                    { author: { $regex: author, $options: 'i' } },
                ],
            });
            res.json(books);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
