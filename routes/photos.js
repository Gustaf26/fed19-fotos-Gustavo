const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/foto_controller');
const profileValidationRules = require('../validation_rules/profile');

/* Get resource's fotos */
router.get('/photos', fotoController.getFotos);

/* Get resource's single foto */
router.get('/photos/:photoId', fotoController.getSingleFoto);

/* Create a foto to this user's collection */
router.post('/photos', [profileValidationRules.createfoto], fotoController.storeFoto);

/*Update foto's attributes*/
router.put('/photos/:photoId', [profileValidationRules.updatefoto],fotoController.updateFoto)

/* Delete resource's single foto */
router.delete('/photos/:photoId', fotoController.deleteFoto);


module.exports = router;