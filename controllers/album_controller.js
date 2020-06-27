/**
 * Album Controller
 */

const models = require('../models');
const { User, Photo, Album } = require('../models');
const { matchedData, validationResult } = require('express-validator');


/**
 * 
 * GET /albums
 */

const getAlbums = async (req, res) => {

	// query db for user and albums relation
	
	let user = null;

	try {

		user = await new models.User({id:req.user.data.id}).fetch({ withRelated: ['albums']}) 

		// get this user's albums
		const albums = await user.related('albums');

		res.send({

			status: 'success',
			data: {
				albums: {
					albums: albums}}});}
					
	catch (err) {

		console.error(err);
		res.status(404).send({

			status: 'fail',
			message: 'resource not found'});
		
		return;}}

/**
 * 
 * Create an album
 */

const storeAlbum = async (req, res) => {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {

		console.log("Create user request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array()});

		return;}

	const validData = matchedData(req);

	try {
		
		const album = await new Album({title: validData.title}).save()

		const user = await new User({id:req.user.data.id}).fetch()
		
		const result = await user.albums().attach(album)
		
		res.status(201).send({

			status: 'success',
			data: {
				album: album,
			    user: user}})}
	
	catch(err) {
		
		res.status(404).send('Album not found')}}

/**
 * Get a specific resource
 *
 * GET /:albumId
 */

const getSingleAlbum = async (req, res) => {

	const joker = await new models.Album({ id: req.params.albumId} )

		.fetch({ withRelated: ['user'] });

	const userId = joker.related('user').pluck('id')

	try {

		const album = await new models.Album({ id: req.params.albumId })

			.fetch({ withRelated: ['photos'] });
	
		if (userId !=req.user.data.id) {
	
			throw err}

			
		res.send({

			status: 'success',
			data: {
				album: {
				album: album }}});}

	catch (err) {
		
		res.status(404).send({

			status: 'fail',
			data: 'resource not found or not belonging to current user'})}}

/**
 * 
 * Update album attributes 
 */

const updateAlbum = async (req,res)=> {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log("Create user request failed validation:", 
		
		errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array()});

		return}

	const validData = matchedData(req);

	const existingAlbum = await new Album({id: req.params.albumId}).fetch({ withRelated: ['user'] })

	if (!existingAlbum.related('user').pluck('id')==req.user.data.id || !existingAlbum) {

		res.status(403).send({

			status: 'fail',
			data: 'You are not allowed to update this album or the album doesnt exist'
		})

		return}

	try {
		
		const album = await new Album({id: req.params.albumId}).save(validData)
		
		res.status(201).send({

			status: 'success',
			data: album})}
	
	catch {
		
		res.status(500).send({
			
			status: 'fail',
			data: ` Network error`})}}

/**
 * 
 * Add photo to album
 */

 const addToAlbum = async (req, res) =>{

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log("Create user request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});

		return;}

	const validData = matchedData(req);
	
	const album = await new models.Album({ id: req.params.albumId })
	
		.fetch({ withRelated: ['user'] })

	const userId = album.related('user').pluck('id')

	if (userId !=req.user.data.id) {
		
		 res.status(403).send({

		 	status: 'fail',
		 	data: 'The album you tyr to change is not yours'
		 })

		 return}

	let val = validData.photo_id

	if (typeof val == 'number') {

		try {

		let photo = await new Photo({id:val}).fetch({ withRelated: ['user'] })

			let photo_userId= await photo.related('user').pluck('id')

			if (photo_userId.toString() !== userId.toString()) {

				res.status(403).send({

					status: 'fail',
					data: 'The photo you are trying to add to this album is not yours'
				})

				return}	
		
			const result = await album.photos().attach(photo)
			

			res.send({

				status: 'success',
				data: {
					album: album,
					photo: photo}});

			return}

		catch {

			res.status(404).send({
				status: 'fail',
				data: 'We cant find a photo with that photo_id'})}}

	else {

		try { 

			let comment = [];
			let allComments=[]

			const allPhotos = async () => {
				
			for (i=0; i < val.length; i++) {

				let photo = await new Photo({id:val[i]}).fetch({ withRelated: ['user'] })

				let photo_userId= await photo.related('user').pluck('id')

				if (photo_userId.toString() !== userId.toString()) {

					res.status(403).send({

						status: 'fail',
						data: 'The photo you are trying to add to this album is not yours'})

					return}
			
		
				const result = await album.photos().attach(photo)
				
				allComments = comment.push(`${photo.get('title')} with id ${photo.get('id')} has been attached to ${album.get('title')}`)}

				res.send({

					status: 'success',
					data: comment});

			return}

			allPhotos()}

		catch (err) {

			res.status(500).send({
				status: 'error',
				data: 'Network error'})}}}


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
			
			return}

		try { 

			const album = await album_user.fetch({ withRelated: ['photos'] });	

			if (!album) {

					throw err}

			const photos = album.related('photos')

			const dettaching = await photos.map(photo=>album.photos().detach(photo))

			const delAlbum = await album.destroy()

			res.status(200).send({

				status: 'success',
				data: 'Album successfully deleted'})}

		catch {

			res.status(404).send({

				status: 'fail',
				message: 'The album you want to delete doesnt exist' });}}


const deleteInAlbum = async (req,res) => {

	const album = await new models.Album({ id: req.params.albumId })
		.fetch({ withRelated: ['user'] });

	const user = album.related('user').pluck('id')

	const photo = await new models.Photo({ id: req.params.photoId })
		.fetch({ withRelated: ['user'] });;	

	const secondUser = photo.related('user').pluck('id')
	
	if (user !=req.user.data.id || secondUser !=req.user.data.id) {

			res.status(403).send({

				status: 'fail',
				data: 'Unauthorized. You are not allowed to delete this foto or to change this album'
			})

		return}

	try { 
		
		const dettaching = await photo.album().detach(album)

			res.status(200).send({

				status: 'success',
				data: album})}

	catch {

		res.status(500).send({

			status: 'error',
			message: 'Something not working fine with the database'});}}

module.exports = {
	
	storeAlbum,
	getAlbums,
	getSingleAlbum,
	deleteAlbum,
	addToAlbum,
	updateAlbum,
	deleteInAlbum }
