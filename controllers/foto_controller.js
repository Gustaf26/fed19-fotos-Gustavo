/**
 * Foto Controller
 */

const models = require('../models');
const { User, Foto, Album } = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get the authenticated user's fotos
 *
 * GET /fotos
 */

const getFotos = async (req, res) => {

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
 * Create a foto
 *
 */

const storeFoto = async (req, res) => {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log("Create user request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});

		return;
	}

	const validData = matchedData(req);

	try {
		
		const foto = await new Foto(validData).save()

		const user = await new User({id:req.user.data.id}).fetch()
		
		const result = await user.fotos().attach(foto)

		res.status(201).send({

			status: 'success',
			data: `Foto with title ${foto.get('title')} and url ${foto.get('url')} has been created`

		})}
		
	
	catch(err) {

		res.status(500).send('SOmething went wrong with the server, try again later')}

}

/**
 * GET /:photoId
 */

const getSingleFoto = async (req, res) => {

	try{ 
		
		const foto = await new models.Foto({ id: req.params.photoId })

			.fetch({ withRelated: ['user'] });	

		const userId = foto.related('user').pluck('id')
	
		if (userId !=req.user.data.id) {

			throw err

			}

		res.send({

			status: 'success',
			data: {
				
				foto: {
					
					title: foto.get('title'), 
					url: foto.get('url')}
				
			}
	}); }

	catch (err) {res.status(404).send({

		status: 'Fail',
		message: 'No such foto found for this user'

	})}
	
}


/**
 * 
 * Update album attributes 
 */

const updateFoto = async (req,res)=> {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
	
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});

		return;
	}

	const validData = matchedData(req);

	const existingFoto = await new Foto({id: req.params.photoId}).fetch({ withRelated: ['user'] })

	if (!existingFoto.related('user').pluck('id')==req.user.data.id || !existingFoto) {

		res.status(403).send({

			status: 'fail',
			data: 'You are not allowed to update this foto or the foto doesnt exist'
		})

		return
	}

	try {
		
		const foto = await new Foto({id: req.params.photoId}).save(validData)
		
		res.status(201).send({

			status: 'success',
			data: `Foto with title ${foto.get('title')} has been updated`})
	}
	
	catch(err) {
		
		res.status(500).send('Network error')}

}


/**
 * Destroy a specific resource
 *
 * DELETE /:photoId
 */

const deleteFoto = async (req, res) => {

	const foto_user = await new models.Foto({ id: req.params.photoId })
		.fetch({ withRelated: ['user'] });

	const user = foto_user.related('user').pluck('id')
	
	if (user !=req.user.data.id) {

			res.status(403).send({

				status: 'fail',
				data: 'Unauthorized. You are not allowed to delete this foto'
			})
		return
			}

	try { 
		
		const foto = await foto_user.fetch({ withRelated: ['album']});	
		if (!foto.related('album').length) {

			const delFoto = await foto.destroy()

			res.status(200).send({

				status: 'success',
				data: `Foto successfully deleted`

					})
					
			return}

		else {
			
			const albumId = foto.related('album').pluck('id')

			const foto_album = await new models.Album({id: albumId}).fetch()

			const albumTitle = foto.related('album').pluck('title')

			const dettaching = foto_album.fotos().detach(foto)

			const delFoto = await foto.destroy()
			
			res.status(200).send({

				status: 'success',
				data: `Foto successfully deleted from album ${albumTitle}`

				})
		}}

	catch {

		res.status(500).send({

			status: 'error',
			message: 'Something not working fine with the database',

			}); 
		   }
	
}

module.exports = {
	
	getFotos,
	getSingleFoto,
	storeFoto,
	deleteFoto,
	updateFoto
}
