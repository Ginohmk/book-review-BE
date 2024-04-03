const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (username && password) {
    if (!isValid) {
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
public_users.get('/', function (req, res) {
  //Write your code here

  if (users.length === 0) {
    res.status(201).json({ message: 'No user avialable' });
  } else {
    return res.status(200).json({ data: users });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const { isbn } = req.params;

  const filteredBooks = books.filter((book) => book.isbn === isbn);
  return res.status(200).json({ data: filteredBooks });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const { author } = req.params;
  const filteredAuthor = books.filter((book) => book.author === author);
  return res.status(200).json({ data: filteredAuthor });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const { title } = req.params;
  const filteredTitle = books.filter((book) => book.title === title);
  return res.status(200).json({ data: filteredTitle });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const { isbn } = req.params;
  const filteredTitle = books.filter((book) => book.isbn === isbn);

  return res.status(200).json({ data: filteredTitle.reviews });
});

module.exports.general = public_users;
