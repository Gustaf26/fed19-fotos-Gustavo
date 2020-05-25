

/**
 * Get the authenticated user's books
 *
 * GET /books
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { matchedData, validationResult } = require('express-validator');
const { User, Foto } = require('../models');


/**
 * Add a user
 *
 * POST /profile
 
 */
const addUser = async (req, res) => {

		try {const user = await new User({id:req.body.user_id, foto: req.body.name}).save()

	//const user = await new User({id:req.user.data.id}).fetch()
		

		res.status(201).send({
			status: 'success',
			data: user
		})
		}
		
		catch(err) {res.status(404).send('Foto not found')}

}

/**
 * Get authenticated user's profile
 *
 * GET /
 */
const getProfile = async (req, res) => {
	// retrieve authenticated user's profile
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id);
	} catch (err) {
		res.sendStatus(404);
		throw err;
	}

	// send (parts of) user profile to requester
	res.send({
		status: 'success',
		data: {
			user: {
				username: user.get('username'),
			},
		}
	});
}


	

/**
 * Update the authenticated user's profile
 *
 * PUT /
 */
const updateProfile = async (req, res) => {
	// query db for user
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id);
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Update profile request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	// if request contains password, hash it
	if (validData.password) {
		try {
			validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds)
		} catch (err) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when hashing the password.',
			});
			throw error;
		}
	}

	try {
		await user.save(validData);
		res.sendStatus(204); // Successfully processed request but returned no content

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating profile.',
		});
		throw error;
	}
}

module.exports = {
	getProfile,
	addUser
	//updateProfile,
}
