const connection = require('../db-config');
const Joi = require('joi');

const db = connection.promise();

const findUsers = async () => {
  return db
    .promise()
    .query('SELECT * FROM users')
    .then(({ res }) => res);
};

const findUser = (async () => {
  return db
    .promise()
    .query('SELECT * FROM users WHERE id= ?', [id])[0]
    .then(({ res }) => res);;
};

const findMail = async () => {
  return db
    .promise()
    .query('SELECT * FROM users WHERE email= ?', [email])
    .then(({ res }) => res);;
};

module.exports = {
  findUsers,
  findUser,
  findMail

}


//ROUTE/USERS.JS
// Create the router object that will manage all operations on movies
const usersRouter = require('express').Router();
// Import the movie model that we'll need in controller functions
const User = require('../models/userDifWay');

const {
  getAllUsers,
  getUser,
  getMail
} = require('../controller/user');

usersRouter.get('/', getAllUsers) => {
  const { id } = req.query;
  User.findMany({ filters: { id } })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving movies from database');
    });
});

usersRouter.get('/:id', getUser)
usersRouter.get('/email', getMail)
usersRouter.post('/', (req, res))
usersRouter.put('/', (req, res))
usersRouter.delete('/', (req, res))

module.exports = usersRouter;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});