/**
 * Authentication middleware
 */

const jwt = require('jsonwebtoken');
const { getTokenFromHeaders } = require('../auth_controller');
const { User } = require('../../models');

const basic = async (req, res, next) => {

	// check if Authorization header exists, otherwise bail
	if (!req.headers.authorization) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization required',
		});

		return}

	const [authSchema, base64Payload] = req.headers.authorization.split(' ');

	if (authSchema.toLowerCase() !== "basic") {
		// not ours to authenticate
		next();}

	const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

	// kalle:omg-food
	const [username, password] = decodedPayload.split(':');

	const user = await User.login(username, password);

	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization failed'});

		return}

	// now that we have authenticated the user and know that he/she/it is who it claims to be
	// attach the user object to the request, so that other parts of the api can use the user
	req.user = user;

	next();
}

const validateJwtToken = (req, res, next) => {

	const token = getTokenFromHeaders(req);
	if (!token) {

		res.status(401).send({
			status: 'fail',
			data: 'No token found in request headers.'});

		return}

	// Validate token and extract payload
	let payload = null;

	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	
	} catch (err) {

		res.status(403).send({
			status: 'fail',
			data: 'Authentication Failed.'});

		throw err;}

	// attach payload to req.user
	req.user = payload;

	next();
}

module.exports = {
	basic,
	validateJwtToken,
}
