require('../config/config');

// mongoose
const { mongoose } = require('../db/mongoose');

// express
const express = require('express');

// joi
const Joi = require('joi');

// objectId validation for joi
Joi.objectId = require('joi-objectid')(Joi);

// routes
const customers = require('../routes/customers');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

// invoke express
const app = express();

// port
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// start server
app.listen(port, () => {
	console.log(`App served on port ${port}`);
});
