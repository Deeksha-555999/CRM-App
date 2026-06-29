const pool = require('../../../database/mysqllib').getPool();

class AdminDao {
    /**
     * Get all users with pagination and filters
     */
    static async getAllUsersWithPagination({ limit, offset, search, status }) {
        let query = `
            SELECT id, name, email, role, is_verified, created_at
            FROM users
            WHERE 1=1
        `;
        const params = [];

        if (search && search.trim() !== '') {
            query += ` AND (name LIKE ? OR email LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`);
        }

        if (status === 'verified') {
            query += ` AND is_verified = 1`;
        } else if (status === 'unverified') {
            query += ` AND is_verified = 0`;
        }

        query += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

        const [rows] = await pool.execute(query, params);
        return rows;
    }

    /**
     * Get count of users with filters
     */
    static async getUsersCount({ search, status }) {
        let query = `SELECT COUNT(*) as count FROM users WHERE 1=1`;
        const params = [];

        if (search && search.trim() !== '') {
            query += ` AND (name LIKE ? OR email LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`);
        }

        if (status === 'verified') {
            query += ` AND is_verified = 1`;
        } else if (status === 'unverified') {
            query += ` AND is_verified = 0`;
        }

        const [rows] = await pool.execute(query, params);
        return rows[0].count;
    }

    /**
     * Get all unverified users
     */
    static async getUnverifiedUsers() {
        const query = `
            SELECT id, name, email, created_at
            FROM users
            WHERE is_verified = 0
            ORDER BY created_at DESC
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }

    /**
     * Update user verification status
     */
    static async updateUserVerification(userId, isVerified) {
        const query = `
            UPDATE users
            SET is_verified = ?
            WHERE id = ?
        `;
        const [result] = await pool.execute(query, [isVerified, userId]);
        return result;
    }

    /**
     * Update user role
     */
    static async updateUserRole(userId, role) {
        const query = `
            UPDATE users
            SET role = ?
            WHERE id = ?
        `;
        const [result] = await pool.execute(query, [role, userId]);
        return result;
    }

    /**
     * Delete a user
     */
    static async deleteUser(userId) {
        const query = `DELETE FROM users WHERE id = ?`;
        const [result] = await pool.execute(query, [userId]);
        return result;
    }

    /**
     * Get user by ID
     */
    static async getUserById(userId) {
        const query = `
            SELECT id, name, email, role, is_verified, created_at
            FROM users
            WHERE id = ?
        `;
        const [rows] = await pool.execute(query, [userId]);
        return rows[0];
    }
}

module.exports = AdminDao;