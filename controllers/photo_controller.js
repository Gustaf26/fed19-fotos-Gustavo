/**
 * Photo Controller
 */

const models = require('../models');
const { User, Photo } = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get the authenticated user's photos
 *
 * GET /photos
 */

const getPhotos = async (req, res) => {

	let user = null;

	try {

		user = await User.fetchById(req.user.data.id, { withRelated: 'photos' });
	
	} catch (err) {
	
		res.status(404).send({

			status:'fail',
			data: 'No photos available for that user'});

		return}

	// get this user's fotos

	const photos = user.related('photos');

	res.send({

		status: 'success',
		data: {
			photos}})}

/**
 * Create a photo
 *
 */

const storePhoto = async (req, res) => {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log("Create user request failed validation:",
		
		errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array()});

		return}

	const validData = matchedData(req);

	try {
		
		const photo = await new Photo(validData).save()

		const user = await new User({id:req.user.data.id}).fetch()
		
		const result = await user.photos().attach(photo)

		res.status(201).send({
			status: 'success, photo created',
			data: photo})}
		
	
	catch(err) {

		res.status(500).send('SOmething went wrong with the server, try again later')}}

/**
 * GET /:photoId
 */

const getSinglePhoto = async (req, res) => {

	try{ 
		
		const photo = await new models.Photo({ id: req.params.photoId })

		.fetch({ withRelated: ['user'] });	

		const userId = photo.related('user').pluck('id')
	
		if (userId !=req.user.data.id) {

			throw err}

		res.send({
			status: 'success',
			data: photo})}

	catch (err) {res.status(404).send({
		status: 'Fail',
		message: 'No such photo found for this user'})}}


/**
 * 
 * Update album attributes 
 */


const updatePhoto = async (req,res)=> {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
	
		res.status(422).send({
			status: 'fail',
			data: errors.array()});

		return;}

	const validData = matchedData(req);

	const existingPhoto = await new Photo({id: req.params.photoId}).fetch({ withRelated: ['user'] })

	if (!existingPhoto.related('user').pluck('id')==req.user.data.id || !existingPhoto) {

		res.status(403).send({

			status: 'fail',
			data: 'You are not allowed to update this photo or the photo doesnt exist'})

		return}

	try {
		
		const photo = await new Photo({id: req.params.photoId}).save(validData)
		
		res.status(201).send({
			status: 'success',
			data: photo})}
	
	catch(err) {
		
		res.status(500).send('Network error')}}


/**
 * Destroy a specific resource
 *
 * DELETE /:photoId
 */

const deletePhoto = async (req, res) => {

	const photo_user = await new models.Photo({ id: req.params.photoId })
	.fetch({ withRelated: ['user'] });

	const user = photo_user.related('user').pluck('id')
	
	if (user !=req.user.data.id) {

			res.status(403).send({
				status: 'fail',
				data: 'Unauthorized. You are not allowed to delete this photo'})

		return}

	try { 
		
		const photo = await photo_user.fetch({ withRelated: ['album']});	
		if (!photo.related('album').length) {

			const delPhoto = await photo.destroy()

			res.status(200).send({
				status: 'success',
				data: `Foto successfully deleted`})
					
			return}

		else {
			
			const albumId = photo.related('album').pluck('id')

			const photo_album = await new models.Album({id: albumId})
			.fetch()

			const albumTitle = photo.related('album').pluck('title')

			const dettaching = await photo_album.fotos().detach(photo)

			const delPhoto = await photo.destroy()
			
			res.status(200).send({

				status: 'success',
				data: `Photo successfully deleted from album ${albumTitle}`})}}

	catch {

		res.status(500).send({
			status: 'error',
			message: 'Something not working fine with the database'})}}

module.exports = {
	
	getPhotos,
	getSinglePhoto,
	storePhoto,
	deletePhoto,
	updatePhoto
}
