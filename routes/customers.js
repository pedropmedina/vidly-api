const express = require('express');
const router = express.Router();
const { mongoose } = require('../db/mongoose');
const { Customer, validateCustomer } = require('../models/customer');

// get customers
router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

// post customers
router.post('/', async (req, res) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone,
	});

	customer = await customer.save();

	res.status(200).send(customer);
});
