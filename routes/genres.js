const express = require('express');
const router = express.Router();
const { mongoose } = require('../db/mongoose');
const { Genre, validateGenre } = require('../models/genre');

router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});
