/**
 * Profile controller
 */


const { User, Foto } = require('../models');


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

				firstName: user.get('first_name'),
				lastName: user.get('last_name'),
				email: user.get('email'),
			},
		}
	});
}


	

module.exports = {

	getProfile,
}
