const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  let usernameFind = users.filter((user) => user.username === username);

  if (usernameFind.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post('/login', (req, res) => {
  //Write your code here
  return res.status(300).json({ message: 'Yet to be implemented' });
});

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  //Write your code here

  const { isbn } = req.params;
  const filteredTitle = books.filter((book) => book.isbn === isbn);

  return res.status(300).json({ data: filteredTitle.reviews });
  return res.status(300).json({ message: 'Yet to be implemented' });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;