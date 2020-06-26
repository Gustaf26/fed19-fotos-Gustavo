const { body, customSanitizer } = require('express-validator');


const createalbum = [body('title').isLength({ min: 3 })]

const addphoto = [body('photo_id').exists().isLength({min: 1}).not().isString()]

module.exports = {
		
    createalbum,
    addphoto
	
}