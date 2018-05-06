const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');
const { genreSchema } = require('./genre');

// mongoose schema
const movieSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 255,
	},
	genre: {
		type: genreSchema,
		required: true,
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
});

// mongoose model
const Movie = mongoose.model('Movie', movieSchema);

// Joi schema
const validateMovie = movie => {
	const schema = {
		title: Joi.string()
			.min(5)
			.max(255)
			.required(),
		genreId: Joi.string().required(),
		numberInStock: Joi.number()
			.min(0)
			.max(255)
			.required(),
		dailyRentalRate: Joi.number()
			.min(0)
			.max(255)
			.required(),
	};

	return Joi.validate(movie, schema);
};

module.exports = { Movie, validateMovie };
