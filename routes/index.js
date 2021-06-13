//Route Movies
const moviesRouter = require('./routes/movies');
const setupRoutes = (app) => {
  app.use('/api/movies', moviesRouter);
};

//Route Users
const usersRouter = require('./routes/users');
const setupRoutes = (app) => {
  app.use('/api/users', usersRouter);
};


module.exports = {
  setupRoutes,
};