const express = require('express');
let books = require('./booksdb.js');
let { isValid, users } = require('./auth_users.js');

const public_users = express.Router();

public_users.post('/register', (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username, password });
      return res
        .status(200)
        .json({ message: 'User successffuly registered!!' });
    } else {
      return res.status(404).json({ messsage: 'User already exist' });
    }
  }

  return res.status(404).json({ message: 'Unable to register ' });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here

  const allBooks = await books;
  if (books.length === 0) {
    res.status(201).json({ message: 'No book avialable' });
  } else {
    return res.status(200).json({ data: allBooks });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  const { isbn } = req.params;

  const filteredBooks = await books[`${isbn}`];
  return res.status(200).json({ data: filteredBooks });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const { author } = req.params;

  let filteredAuthor;

  Object.entries(books).forEach(([key, value]) => {
    if (value.author === author) {
      filteredAuthor = value;
    }
  });
  return res.status(200).json({ data: filteredAuthor });
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  const { title } = req.params;

  let filteredBook;

  Object.entries(books).forEach(([key, value]) => {
    if (value.title === title) {
      filteredBook = value;
    }
  });
  return res.status(200).json({ data: filteredBook });
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
  //Write your code here
  const { isbn } = req.params;
  const filteredBookReviews = await books[`${isbn}`].reviews;

  return res.status(200).json({ data: filteredBookReviews });
});

module.exports.general = public_users;
