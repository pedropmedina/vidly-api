require('../config/config');

// mongoose
const { mongoose } = require('../db/mongoose');

// express
const express = require('express');

// routes
const customers = require('../routes/customers');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');

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

// start server
app.listen(port, () => {
	console.log(`App served on port ${port}`);
});
