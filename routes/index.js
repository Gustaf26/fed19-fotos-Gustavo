const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const albumsRoutes = require('./albums')
const fotosRoutes = require('./photos')
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

router.get('/profile', [auth.validateJwtToken], profileController.getProfile) 

/* Use resource's fotos */
router.use('/photos', [auth.validateJwtToken], fotosRoutes);

/* Use resource's fotos */
router.use('/albums', [auth.validateJwtToken], albumsRoutes);


module.exports = router;
