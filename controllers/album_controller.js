/**
 * Album Controller
 */

const models = require('../models');
const { User, Foto, Album } = require('../models');

/**
 * 
 *
 * GET /albums
 */
const getAlbums = async (req, res) => {

	// query db for user and eager load the books relation
	
	let user = null;

	try {

		user = await User.fetchById(req.user.data.id, { withRelated: 'albums' });

	} catch (err) {

		console.error(err);
		res.status(404).send({

			status: 'fail',
			message: 'resource not found'

		});
		
		return;
	}

	// get this user's albums
	const albums = user.related('albums');

	res.send({

		status: 'success',
		data: {

			albums: {

				titles: albums.map(album=>album.get('title'))

			}
		},
	});
}

/**
 * 
 * Add album
 */

const addAlbum = async (req, res) => {

	try {
		
		const album = await new Album({id:req.body.album_id, foto: req.body.name}).save()

		const user = await new User({id:req.user.data.id}).fetch()
		

		const result = await user.fotos().attach(foto)
		console.log(result)

		res.status(201).send({

			status: 'success',
			data: result
	})
	}
	
	catch(err) {
		
		res.status(404).send('Album not found')}

}

/**
 * Get a specific resource
 *
 * GET /:albumId
 */

const getSingleAlbum = async (req, res) => {

	const joker = await new models.Album({ id: req.params.albumId })

			.fetch({ withRelated: ['user'] });

	const userId = joker.related('user').pluck('id')

	try {

		const album = await new models.Album({ id: req.params.albumId })

			.fetch({ withRelated: ['fotos'] });
	
		if (userId !=req.user.data.id) {
	
			throw err
	
			}

			res.send({

				status: 'success',
				
				data: {
					album: {

						title: album.get('title'),
						fotoTitles: album.related('fotos').pluck('title'),
						fotoUrls: album.related('fotos').pluck('url')
					}
			}
	});}
	catch (err) {
		
		res.status(404).send({
			status: 'fail',
			data: 'resource not found or not belonging to current user'
	})}
}



/**
 * Update a specific resource
 *
 * POST /:authorId
 */
const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Destroy a specific resource
 *
 * DELETE /:authorId
 */
const destroy = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

module.exports = {
	//index,
	addAlbum,
	getAlbums,
	getSingleAlbum,
	//update,
	//destroy,
}
