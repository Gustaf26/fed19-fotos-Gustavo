const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumsValidationRules = require('../validation_rules/albums');


/* Get albums */
router.get('/', albumController.getAlbums);

/* Get single album */
router.get('/:albumId', albumController.getSingleAlbum);


/* Create a album to this user's collection */
router.post('/', [albumsValidationRules.createalbum],albumController.storeAlbum);

/*Update album's attributes*/
router.put('/:albumId', [albumsValidationRules.createalbum],albumController.updateAlbum)


/*Add an existing foto to album */
router.post('/:albumId/photos', [albumsValidationRules.addphoto], albumController.addToAlbum)


/* Delete resource's single album */
router.delete('/:albumId', albumController.deleteAlbum);

/* Delete foto from single album */
router.delete('/:albumId/photos/:photoId', albumController.deleteInAlbum);

module.exports = router;