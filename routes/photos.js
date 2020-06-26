const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation_rules/photos');

/* Get resource's fotos */
router.get('/', photoController.getPhotos);

/* Get resource's single foto */
router.get('/:photoId', photoController.getSinglePhoto);

/* Create a foto to this user's collection */
router.post('/', [photoValidationRules.createphoto], photoController.storePhoto);

/*Update foto's attributes*/
router.put('/:photoId', [photoValidationRules.updatephoto],photoController.updatePhoto)

/* Delete resource's single foto */
router.delete('/:photoId', photoController.deletePhoto);

module.exports = router;