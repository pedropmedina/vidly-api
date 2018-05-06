const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

// mongoode schema
const genreSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});

// mongoose model
const Genre = mongoose.model('Genre', genreSchema);

// Joi schema
const validateGenre = genre => {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
	};
	return Joi.validate(genre, schema);
};

module.exports = { Genre, validateGenre };
