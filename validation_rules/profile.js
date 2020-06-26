/**
 * Profile Validation Rules
 */

const { body, customSanitizer } = require('express-validator');

const updateProfileRules = [
	body('password').optional().isLength({ min: 3 }),
	body('first_name').optional().isLength({ min: 2 }),
	body('last_name').optional().isLength({ min: 2 }),
];

const createphoto = [body('title').isLength({ min: 3 }),
	body('url').isLength({ min: 2 }),
	body('comment').optional().isLength({ min: 2 }),]

const createalbum = [body('title').isLength({ min: 3 })]

const addphoto = [body('photo_id').exists().isLength({min: 1}).not().isString()]

const updatephoto = [body('title').isLength({ min: 1 }),
	body('url').isLength({ min: 1 }),
	body('comment').isLength({ min: 1 })]


module.exports = {
	updateProfileRules,
	createphoto,
	createalbum,
	addphoto,
	updatephoto
}
