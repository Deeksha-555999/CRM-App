const express = require('express');
const AdminController = require('./controllers/adminController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { checkRole } = require('../../middlewares/roleMiddleware');
const validate = require('../../middlewares/validateMiddleware');
const { verifyUserValidation, updateRoleValidation, userIdValidation } = require('./validators/adminValidator');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(checkRole('admin'));

// User management routes
router.get('/users', AdminController.getAllUsers);
router.get('/users/unverified', AdminController.getUnverifiedUsers);
router.patch('/users/:id/verify', 
    validate(userIdValidation, 'params'), 
    validate(verifyUserValidation, 'body'), 
    AdminController.verifyUser
);
router.patch('/users/:id/role', 
    validate(userIdValidation, 'params'), 
    validate(updateRoleValidation, 'body'), 
    AdminController.updateUserRole
);
router.delete('/users/:id', 
    validate(userIdValidation, 'params'), 
    AdminController.deleteUser
);

module.exports = router;