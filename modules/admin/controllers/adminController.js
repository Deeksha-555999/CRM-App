const AdminService = require('../services/adminService');
const Response = require('../../../responses/responses');
const { asyncHandler } = require('../../../middlewares/errorHandler');
const logger = require('../../../logging/logging');

class AdminController {
    /**
     * Get all users with pagination
     */
    static getAllUsers = asyncHandler(async (req, res) => {
        const apiReference = { module: 'admin', api: 'getAllUsers', apiId: req.apiId };
        const { page = 1, limit = 10, search = '', status = 'all' } = req.query;
        
        logger.log(apiReference, 'Get all users request', { page, limit, search, status });
        
        const result = await AdminService.getAllUsers({
            page: parseInt(page),
            limit: parseInt(limit),
            search,
            status
        });

        logger.log(apiReference, 'Users fetched successfully', { count: result.users.length, total: result.pagination.total });
        Response.paginated(res, result.users, result.pagination, 'Users fetched successfully');
    });

    /**
     * Get all unverified users
     */
    static getUnverifiedUsers = asyncHandler(async (req, res) => {
        const apiReference = { module: 'admin', api: 'getUnverifiedUsers', apiId: req.apiId };
        logger.log(apiReference, 'Get unverified users request');
        
        const users = await AdminService.getUnverifiedUsers();
        
        logger.log(apiReference, 'Unverified users fetched successfully', { count: users.length });
        Response.success(res, users, 'Unverified users fetched successfully');
    });

    /**
     * Verify a user
     */
    static verifyUser = asyncHandler(async (req, res) => {
        const apiReference = { module: 'admin', api: 'verifyUser', apiId: req.apiId };
        const { id } = req.params;
        const { action } = req.body;
        
       
        
        logger.log(apiReference, 'Verify user request', { userId: id, action });
        
        const result = await AdminService.verifyUser(id, action);
        
        logger.log(apiReference, `User ${action}d successfully`, { userId: id, action });
        Response.success(res, result, `User ${action}d successfully`);
    });

    /**
     * Update user role
     */
    static updateUserRole = asyncHandler(async (req, res) => {
        const apiReference = { module: 'admin', api: 'updateUserRole', apiId: req.apiId };
        const { id } = req.params;
        const { role } = req.body;
        
        logger.log(apiReference, 'Update user role request', { userId: id, newRole: role });
        
        const result = await AdminService.updateUserRole(id, role);
        
        logger.log(apiReference, 'User role updated successfully', { userId: id, newRole: role });
        Response.success(res, result, 'User role updated successfully');
    });

    /**
     * Delete a user
     */
    static deleteUser = asyncHandler(async (req, res) => {
        const apiReference = { module: 'admin', api: 'deleteUser', apiId: req.apiId };
        const { id } = req.params;
        
        logger.log(apiReference, 'Delete user request', { userId: id });
        
        await AdminService.deleteUser(id);
        
        logger.log(apiReference, 'User deleted successfully', { userId: id });
        Response.success(res, null, 'User deleted successfully');
    });
}

module.exports = AdminController;