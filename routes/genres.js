const express = require('express');
const router = express.Router();
const { mongoose } = require('../db/mongoose');
const { Genre, validateGenre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// get genres
router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

// get genre by id
router.get('/:id', async (req, res) => {
	const genre = await Genre.findById(req.params.id);

	if (!genre) {
		return res.status(404).send('Genre with given Id not found.');
	}

	res.send(genre);
});

// post genre
router.post('/', auth, async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let genre = new Genre({
		name: req.body.name,
	});

	genre = await genre.save();

	res.send(genre);
});

// put genere
router.put('/:id', auth, async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true },
	);

	if (!genre) {
		return res.status(404).send('Genre with given Id not found.');
	}

	res.send(genre);
});

// delete genre
router.delete('/:id', [auth, admin], async (req, res) => {
	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre) {
		return res.status(404).send('Genre with given Id not found.');
	}

	res.send(genre);
});

module.exports = router;
