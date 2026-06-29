const express = require('express');
const router = express.Router();
const LoginController = require('./controllers/loginController');
const { authMiddleware, isAdmin, validate } = require('../../middlewares');
const { loginValidation } = require('./validators/loginValidator');
const requestIdMiddleware = require('../../middlewares/requestIdMiddleware')

router.use(requestIdMiddleware)

router.post('/login', validate(loginValidation), LoginController.login);
router.post('/refresh', LoginController.refreshToken);


router.get('/profile', authMiddleware, LoginController.getProfile);
router.post('/logout', authMiddleware, LoginController.logout);


router.get('/users', authMiddleware, isAdmin, LoginController.getAllUsers);
router.patch('/users/:id/verify', authMiddleware, isAdmin, LoginController.verifyUser);
router.delete('/users/:id', authMiddleware, isAdmin, LoginController.deleteUser);

module.exports = router;