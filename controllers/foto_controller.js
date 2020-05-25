/**
 * Foto Controller
 */

const models = require('../models');
const { User, Foto, ALbum } = require('../models');

/**
 * Get the authenticated user's fotos
 *
 * GET /fotos
 */
const getFotos = async (req, res) => {
	// query db for user and eager load the books relation
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: 'fotos' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// get this user's books
	const fotos = user.related('fotos');

	res.send({
		status: 'success',
		data: {
			fotos,
		},
	});
}

/**
 * Add a book to the authenticated user's collection
 *
 * POST /books
 * {
 *   "book_id": 4
 * }
 */
const addFoto = async (req, res) => {

	try {const foto = await new Foto({id:req.body.foto_id, foto: req.body.foto}).save()

	const user = await new User({id:req.user.data.id}).fetch()
	

	const result = await user.fotos().attach(foto)
	console.log(result)

	res.status(201).send({
		status: 'success',
		data: result
	})
	}
	
	catch(err) {res.status(404).send('Foto not found')}

}

/**
 * Get a specific resource
 *
 * GET /:fotoId
 */
const getSingleFoto = async (req, res) => {
	const foto = await new models.Foto({ id: req.params.fotoId })
		.fetch({ withRelated: ['album'] });

	res.send({
		status: 'success',
		data: {
			foto,
		}
	});
}




/**
 * Destroy a specific resource
 *
 * DELETE /:bookId
 */
const destroy = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

module.exports = {
	//index,
	getFotos,
	getSingleFoto,
	addFoto,
	//destroy,
}
