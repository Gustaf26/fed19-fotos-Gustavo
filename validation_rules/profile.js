/**
 * Profile Validation Rules
 */

const { body } = require('express-validator');

const updateProfileRules = [
	body('password').optional().isLength({ min: 3 }),
	body('first_name').optional().isLength({ min: 2 }),
	body('last_name').optional().isLength({ min: 2 }),
];

const createfoto = [body('title').isLength({ min: 3 }),
body('url').isLength({ min: 2 }),
body('comment').optional().isLength({ min: 2 }),]

const createalbum = [body('title').isLength({ min: 3 })]

const addfoto = [body('photo_id').isLength({ min: 3 })]


module.exports = {
	updateProfileRules,
	createfoto,
	createalbum,
	addfoto
}
