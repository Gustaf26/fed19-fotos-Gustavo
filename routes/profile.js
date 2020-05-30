const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const fotoController = require('../controllers/foto_controller');
const albumController = require('../controllers/album_controller');
const profileValidationRules = require('../validation_rules/profile');


/* Get resource */
router.get('/', profileController.getProfile);

/* Get resource's fotos */
router.get('/fotos', fotoController.getFotos);

/* Get resource's single foto */
router.get('/fotos/:fotoId', fotoController.getSingleFoto);

/* Get albums */
router.get('/albums', albumController.getAlbums);

/* Get single album */
router.get('/albums/:albumId', albumController.getSingleAlbum);

/* Add a foto to this user's collection */
router.post('/fotos', [profileValidationRules.createfoto], fotoController.addFoto);

/* Add a album to this user's collection */
router.post('/albums', [profileValidationRules.createalbum],albumController.addAlbum);

/*Update album's attributes*/
router.put('/albums/:albumId', [profileValidationRules.createalbum],albumController.updateAlbum)

/*Update foto's attributes*/
router.put('/fotos/:fotoId', [profileValidationRules.updatefoto],fotoController.updateFoto)

/*Add an existing foto to album */
router.post('/albums/:albumId/fotos', [profileValidationRules.addfoto], albumController.addToAlbum)

/* Delete resource's single foto */
router.delete('/fotos/:fotoId', fotoController.deleteFoto);

/* Delete resource's single album */
router.delete('/albums/:albumId', albumController.deleteAlbum);

/* Delete foto from single album */
router.delete('/albums/:albumId/fotos/:fotoId', albumController.deleteInAlbum);

module.exports = router;
