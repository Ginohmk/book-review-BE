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
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post('/login', (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({ message: 'Eror logging in' });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      'access',
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };

    console.log(accessToken, ' Token');

    return res.status(200).send('User successfully logged in');
  } else {
    return res.status(208).json({ message: 'Invalid credentials' });
  }
});

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  //Write your code here
  const { username, review } = req.body;
  const { isbn } = req.params;
  const filteredBook = books[`${isbn}`];

  // handles for Review is present by user(Update) and create if not present
  filteredBook.reviews[`${username}`] = review;

  // Add to books
  books[`${isbn}`] = {
    ...books[`${isbn}`],
    reviews: {
      ...filteredBook.reviews,
    },
  };

  return res.status(200).json({ data: books[`${isbn}`].reviews });
});

// Add a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
  //Write your code here
  const { username } = req.body;
  const { isbn } = req.params;

  delete books[`${isbn}`].reviews[`${username}`];

  return res.status(200).json({ data: books[`${isbn}`].reviews });
});

module.exports = {
  regd_users,
  isValid,
  users,
};
