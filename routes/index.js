const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const fotoController = require('../controllers/foto_controller');
const albumController = require('../controllers/album_controller');
const profileValidationRules = require('../validation_rules/profile');
const auth = require('../controllers/middlewares/auth');
const authController = require('../controllers/auth_controller');
const userValidationRules = require('../validation_rules/user');

/* GET / */

router.get('/', (req, res) => {
	res.send({ status: 'you had me at EHLO' });
});

// add ability to register

router.post('/register', [userValidationRules.createRules], authController.register);

// add ability to login and get JWT access-token and refresh token

router.post('/login', authController.login);

// add ability to refresh a token

router.post('/refresh', authController.refresh);

// add ability to validate JWT's

router.get('/profile', [auth.validateJwtToken], require('./profile'));

/* Get resource's fotos */
router.get('/photos', fotoController.getFotos);

/* Get resource's single foto */
router.get('/photos/:photoId', fotoController.getSingleFoto);

/* Get albums */
router.get('/albums', albumController.getAlbums);

/* Get single album */
router.get('/albums/:albumId', albumController.getSingleAlbum);

/* Create a foto to this user's collection */
router.post('/photos', [profileValidationRules.createfoto], fotoController.storeFoto);

/* Create a album to this user's collection */
router.post('/albums', [profileValidationRules.createalbum],albumController.storeAlbum);

/*Update album's attributes*/
router.put('/albums/:albumId', [profileValidationRules.createalbum],albumController.updateAlbum)

/*Update foto's attributes*/
router.put('/photos/:photoId', [profileValidationRules.updatefoto],fotoController.updateFoto)

/*Add an existing foto to album */
router.post('/albums/:albumId/photos', [profileValidationRules.addfoto], albumController.addToAlbum)

/* Delete resource's single foto */
router.delete('/photos/:photoId', fotoController.deleteFoto);

/* Delete resource's single album */
router.delete('/albums/:albumId', albumController.deleteAlbum);

/* Delete foto from single album */
router.delete('/albums/:albumId/photos/:photoId', albumController.deleteInAlbum);


module.exports = router;
