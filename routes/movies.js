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

// post movie
router.post('/', async (req, res) => {
	const { error } = validateMovie(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre');

	let movie = new Movie({
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name,
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate,
	});

	movie = await movie.save();

	res.send(movie);
});

// put movie
router.put('/:id', async (req, res) => {
	const { error } = validateMovie(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre');

	const movie = await Movie.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			genre: {
				_id: genre._id,
				name: genre.name,
			},
			numberInStock: req.body.numberInStock,
			dailyRentalRate: req.body.dailyRentalRate,
		},
		{ new: true },
	);

	if (!movie) return res.status(404).send('Movie with ID provided not found.');

	res.send(movie);
});

// delete movie
router.delete('/:id', async (req, res) => {
	const movie = await Movie.findByIdAndRemove(req.params.id);

	if (!movie) return res.status(404).send('Movie with ID provided not found.');

	res.send(movie);
});

module.exports = router;
