/**
 * Foto Controller
 */

const models = require('../models');
const { User, Foto, Album } = require('../models');

/**
 * Get the authenticated user's fotos
 *
 * GET /fotos
 */

const getFotos = async (req, res) => {

	// query db for user and eager load the fotos relation

	let user = null;

	try {

		user = await User.fetchById(req.user.data.id, { withRelated: 'fotos' });
	
	} catch (err) {
	
		
		res.status(404).send({

			status:'fail',
			data: 'No fotos available for that user'
		});

		return;
	}

	// get this user's fotos

	const fotos = user.related('fotos');

	res.send({
		status: 'success',
		data: {
			fotos,
		},
	});
}

/**
 * Add a foto to the authenticated user's collection
 *
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
 * GET /:fotoId
 */

const getSingleFoto = async (req, res) => {

	try{ const foto = await new models.Foto({ id: req.params.fotoId })
	
		.fetch({ withRelated: ['album'] });

	res.send({
		status: 'success',
		data: {
			foto,
		}
	}); }

	catch (err) {res.status(404).send({

		status: 'Fail',
		message: 'No such foto found for this user'
	})}
	
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
