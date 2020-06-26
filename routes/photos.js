const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/foto_controller');
const profileValidationRules = require('../validation_rules/profile');

/* Get resource's fotos */
router.get('/', fotoController.getFotos);

/* Get resource's single foto */
router.get('/:photoId', fotoController.getSingleFoto);

/* Create a foto to this user's collection */
router.post('/', [profileValidationRules.createfoto], fotoController.storeFoto);

/*Update foto's attributes*/
router.put('/:photoId', [profileValidationRules.updatefoto],fotoController.updateFoto)

/* Delete resource's single foto */
router.delete('/:photoId', fotoController.deleteFoto);


module.exports = router;