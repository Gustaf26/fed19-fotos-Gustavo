/**
 * Profile controller
 */


const { User } = require('../models');


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
		throw err}

	// send (parts of) user profile to requester

	res.send({

		status: 'success',
		data: {
			user: user}})}


module.exports = {getProfile}
