const AdminDao = require('../dao/adminDao');
const { AppError } = require('../../../middlewares/errorHandler');

class AdminService {
    /**
     * Get all users with pagination and filters
     */
    static async getAllUsers({ page, limit, search, status }) {
        try {
            const offset = (page - 1) * limit;
            
            const users = await AdminDao.getAllUsersWithPagination({
                limit,
                offset,
                search,
                status
            });
            
            const total = await AdminDao.getUsersCount({ search, status });
            
            return {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get all unverified users
     */
    static async getUnverifiedUsers() {
        try {
            return await AdminDao.getUnverifiedUsers();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Verify or reject a user
     */
    static async verifyUser(userId, action) {
        try {
            if (!['approve', 'reject'].includes(action)) {
                throw new AppError('Invalid action. Use "approve" or "reject"', 400, 'INVALID_ACTION');
            }

            // Check if user exists
            const user = await AdminDao.getUserById(userId);
            if (!user) {
                throw new AppError('User not found', 404, 'USER_NOT_FOUND');
            }

            if (action === 'approve') {
                return await AdminDao.updateUserVerification(userId, true);
            } else {
                // For reject, delete the user
                return await AdminDao.deleteUser(userId);
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user role
     */
    static async updateUserRole(userId, role) {
        try {
            if (!['admin', 'user'].includes(role)) {
                throw new AppError('Invalid role. Use "admin" or "user"', 400, 'INVALID_ROLE');
            }

            // Check if user exists
            const user = await AdminDao.getUserById(userId);
            if (!user) {
                throw new AppError('User not found', 404, 'USER_NOT_FOUND');
            }

            return await AdminDao.updateUserRole(userId, role);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a user
     */
    static async deleteUser(userId) {
        try {
            // Check if user exists
            const user = await AdminDao.getUserById(userId);
            if (!user) {
                throw new AppError('User not found', 404, 'USER_NOT_FOUND');
            }

            return await AdminDao.deleteUser(userId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AdminService;