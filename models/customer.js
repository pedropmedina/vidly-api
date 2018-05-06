const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// mongoose schema
const customerSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	isGold: {
		type: Boolean,
		default: false,
	},
	phone: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});

// mongoose model
const Customer = mongoose.model('Customer', customerSchema);

// joi schema
const validateCustomer = customer => {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		phone: Joi.string()
			.min(5)
			.max(50)
			.required(),
		isGold: Joi.boolean(),
	};
};

module.exports = { Customer, validateCustomer };
