const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// mongoode schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() {
	const user = this;

	const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, 'secret');
	return token;
};

// mongoose model
const User = mongoose.model('User', userSchema);

// Joi schema
const validateUser = user => {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required(),
	};
	return Joi.validate(user, schema);
};

module.exports = { User, validateUser };
