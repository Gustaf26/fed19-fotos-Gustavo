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

	try {
		
		const foto = await new Foto({title: req.body.title, url:req.body.url, comment:req.body.comment}).save()

		const album = await new Album({id: req.body.album_id}).fetch()

		const user = await new User({id:req.user.data.id}).fetch()
		
		const result = await user.fotos().attach(foto)

		const resultTwo = await foto.album().attach(album)

		res.status(201).send({

			status: 'success',
			data: {
				
				foto: result,
				album:resultTwo}

	})}
	
	catch(err) {res.status(404).send('Foto not found')}

}

/**
 * GET /:fotoId
 */

const getSingleFoto = async (req, res) => {

	try{ 
		
		const foto = await new models.Foto({ id: req.params.fotoId })

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
 * Destroy a specific resource
 *
 * DELETE /:bookId
 */

const deleteFoto = async (req, res) => {

	const foto_user = await new models.Foto({ id: req.params.fotoId })
		.fetch({ withRelated: ['user'] });

	const user = foto_user.related('user').pluck('id')
	
	if (user !=req.user.data.id) {

			res.status(404).send({

				status: 'fail',
				data: 'You are not allowed to delete this foto'
			})
		return
			}

	try { 
		
		const foto = await foto_user.fetch({ withRelated: ['album'] });	

		if (!foto) {

				throw err
	
				}

		const albumId = foto.related('album').pluck('id')

		const foto_album = await new models.Album({id: albumId}).fetch()
		
		const dettaching = foto_album.fotos().detach(foto)

		const delFoto = await foto.destroy()
		
		res.status(200).send({

			status: 'success',
			data: {

				message: 'Foto successfully deleted (even from its album)', 
				messagedb: delFoto}

		})}

	catch {

		res.status(405).send({

			status: 'fail',
			message: 'The foto you want to delete doesnt exist',

			}); 
		   }
	
}

module.exports = {
	
	getFotos,
	getSingleFoto,
	addFoto,
	deleteFoto,
}
