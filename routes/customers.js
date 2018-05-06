const express = require('express');
const router = express.Router();
const { mongoose } = require('../db/mongoose');
const { Customer, validateCustomer } = require('../models/customer');

// get customers
router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

// get customer by id
router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	if (!customer) {
		return res.status(404).send('Customer with given ID no found.');
	}

	res.send(customer);
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

// put customers
router.put('/:id', async (req, res) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			isGold: req.body.isGold,
			phone: req.body.phone,
		},
		{ new: true },
	);

	if (!customer) {
		return res.status(404).send('Customer with given ID not found.');
	}

	res.send(customer);
});

// delete customer
router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);

	if (!customer) {
		return res.status(404).send('Customer with given ID no found.');
	}

	res.send(customer);
});

module.exports = { router };
