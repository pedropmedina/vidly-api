const express = require('express');
const router = express.Router();
const { mongoose } = require('../db/mongoose');
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});
