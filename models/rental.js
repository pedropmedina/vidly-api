const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

// mongoose schema
const rentalSchema = new Schema({
	customer: {
		type: new Schema({
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
		}),
		required: true,
	},
	movie: {
		type: new Schema({
			title: {
				type: String,
				required: true,
				trim: true,
				minlength: 5,
				maxlength: 255,
			},
			dailyRentalRate: {
				type: Number,
				required: true,
				min: 0,
				max: 255,
			},
		}),
		required: true,
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now,
	},
	dateReturned: {
		type: Date,
	},
	rentalFee: {
		type: Number,
		min: 0,
	},
});

// model
const Rental = mongoose.model('Rental', rentalSchema);

const validateRental = rental => {
	const schema = {
		customerId: Joi.string().required(),
		movieId: Joi.string().required(),
	};

	return Joi.validate(rental, schema);
};

module.exports = { Rental, validateRental };