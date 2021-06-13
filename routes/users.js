// Create the router object that will manage all operations on movies
const moviesRouter = require('express').Router();
// Import the movie model that we'll need in controller functions
const Movie = require('../models/user');

// GET /api/movies/
usersRouter.get('/', (req, res) => {
  const { city, language } = req.query;
  Movie.findMany({ filters: { city, language } })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving users from database');
    });
});

// TODO : GET /api/movies/:id
// moviesRouter.get('/:id', (req, res) => { ... })
usersRouter.get('/:id', (req, res) => {
  User.findOne(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user), [0];
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((err) => {
      res.status(500).send('Error retrieving movie from database');
    });
});

usersRouter.post('/', (req, res) => {
  const error = User.validate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    User.create(req.body)
      .then((createdUser) => {
        res.status(201).json(createdUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving the user');
      });
  }
});

usersRouter.put('/:id', (req, res) => {
  let existingUser = null;
  let validationErrors = null;
  UserRouter.findOne(req.params.id)
    .then((user) => {
      existingUser = user;
      if (!existingUser) return Promise.reject('RECORD_NOT_FOUND');
      validationErrors = User.validate(req.body, false);
      if (validationErrors) return Promise.reject('INVALID_DATA');
      return User.update(req.params.id, req.body);
    })
    .then(() => {
      res.status(200).json({ ...existingUser, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`User with id ${req.params.id} not found.`);
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors: validationErrors.details });
      else res.status(500).send('Error updating a movie.');
    });
});

usersRouter.delete('/:id', (req, res) => {
  User.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send('🎉 User deleted!');
      else res.status(404).send('User not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting a user');
    });
});

// Don't forget to export the router in order to link it to the app in routes/index.js
module.exports = usersRouter;