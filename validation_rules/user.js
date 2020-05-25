/**
 * User Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

const createRules = [
	body('username').isLength({ min: 3 }).custom(async value => {
		const user = await new models.User({ username: value }).fetch({ require: false });
		if (user) {
			return Promise.reject('Username already exists.');
		}

		return Promise.resolve();
	}),
	body('password').isLength({ min: 3 }),
	body('first_name').isLength({ min: 2 }),
	body('last_name').isLength({ min: 2 }),
];

const updateRules = [
	body('password').optional().isLength({ min: 3 }),
	body('first_name').optional().isLength({ min: 2 }),
	body('last_name').optional().isLength({ min: 2 }),
];

module.exports = {
	createRules,
	updateRules,
}
