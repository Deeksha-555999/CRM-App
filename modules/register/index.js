const express = require('express');
const router = express.Router();
const RegisterController = require('./controllers/registerController');
const { validate } = require('../../middlewares');
const { registerValidation } = require('./validators/registerValidator');
const requestIdMiddleware = require('../../middlewares/requestIdMiddleware');
// Public route
router.use(requestIdMiddleware);
router.post('/register', validate(registerValidation), RegisterController.register);

module.exports = router;
