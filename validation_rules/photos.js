
const { body, customSanitizer } = require('express-validator');

const createphoto = [body('title').isLength({ min: 3 }),
	body('url').isLength({ min: 2 }),
	body('comment').optional().isLength({ min: 2 }),]

const updatephoto = [body('title').isLength({ min: 1 }),
	body('url').isLength({ min: 1 }),
    body('comment').isLength({ min: 1 })]
    
module.exports = {
    
        createphoto,
        updatephoto
    }