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

	// query db for user and albums relation
	
	let user = null;

	try {

		user = await User.fetchById(req.user.data.id, { withRelated: 'albums' });

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

	} catch (err) {

		console.error(err);
		res.status(404).send({

			status: 'fail',
			message: 'resource not found'

		});
		
		return;
	}
}

/**
 * 
 * Add album
 */

const addAlbum = async (req, res) => {

	try {
		
		const album = await new Album({title: req.body.title}).save()

		const user = await new User({id:req.user.data.id}).fetch()
		
		const result = await user.albums().attach(album)
		
		res.status(201).send({

			status: 'success',
			data: result})
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
 * Destroy a specific resource
 *
 * DELETE /:albumId
 */

const deleteAlbum = async (req, res) => {
	
		const album_user = await new models.Album({ id: req.params.albumId })
			.fetch({ withRelated: ['user'] });

		const user = album_user.related('user').pluck('id')

		if (user !=req.user.data.id) {

			res.status(403).send({

				status: 'fail',
				data: 'Unauthorized. You are not allowed to delete this album'
			})
		return

			}

		try { 

			const album = await album_user.fetch({ withRelated: ['fotos'] });	

			if (!album) {

					throw err}

			const fotos = album.related('fotos')

			const dettaching = fotos.map(foto=>album.fotos().detach(foto))

			const delAlbum = await album.destroy()

			res.status(200).send({

				status: 'success',
				data: {

					message: 'Album successfully deleted (even its fotos)', 
					messagedb: delAlbum}

		})}

		catch {

		res.status(404).send({

			status: 'fail',
			message: 'The album you want to delete doesnt exist',

			}); 
		}

}

module.exports = {
	
	addAlbum,
	getAlbums,
	getSingleAlbum,
	deleteAlbum,
}
