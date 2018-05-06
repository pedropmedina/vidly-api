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

// get movie by id
router.get('/:id', async (req, res) => {
	const movie = await Movie.findById(req.params.id);

	if (!movie) {
		return res.status(404).send('Movie with ID provided not found.');
	}

	res.send(movie);
});
