const express = require('express');
const router = express.Router();
const { mongoose } = require('../db/mongoose');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

// get movies
router.get('/', async (req, res) => {
	const movies = await Movie.find().sort('name');
	res.send(movies);
});
