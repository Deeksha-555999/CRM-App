const pool = require('../../../database/mysqllib').getPool();

class CustomerDao {
  static async create(customerData) {
    try {
      const { name, email, phone, company, address, status = 'active', created_by } = customerData;
      const [result] = await pool.execute(
        'INSERT INTO customers (name, email, phone, company, address, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone, company, address, status, created_by]
      );
      return result.insertId;
    } catch (error) {
      console.error('CustomerDao.create error:', error);
      throw error;
    }
  }

  static async findAll(page = 1, limit = 10, search = '') {
    try {
      const offset = (page - 1) * limit;
      const limitInt = parseInt(limit) || 10;
      const offsetInt = parseInt(offset) || 0;
      
      let query = 'SELECT * FROM customers';
      let countQuery = 'SELECT COUNT(*) as total FROM customers';
      const params = [];

      if (search) {
        const searchCondition = ' WHERE name LIKE ? OR email LIKE ? OR company LIKE ?';
        query += searchCondition;
        countQuery += searchCondition;
        const searchParam = `%${search}%`;
        params.push(searchParam, searchParam, searchParam);
      }

      query += ` ORDER BY created_at DESC LIMIT ${limitInt} OFFSET ${offsetInt}`;
      
      const [rows] = await pool.execute(query, params);
      const [countResult] = await pool.execute(countQuery, params);
      
      return {
        data: rows,
        pagination: {
          total: countResult[0].total,
          page,
          limit,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      };
    } catch (error) {
      console.error('CustomerDao.findAll error:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('CustomerDao.findById error:', error);
      throw error;
    }
  }

  static async update(id, customerData) {
    try {
      const updates = [];
      const values = [];

      if (customerData.name !== undefined) {
        updates.push('name = ?');
        values.push(customerData.name);
      }
      if (customerData.email !== undefined) {
        updates.push('email = ?');
        values.push(customerData.email);
      }
      if (customerData.phone !== undefined) {
        updates.push('phone = ?');
        values.push(customerData.phone);
      }
      if (customerData.company !== undefined) {
        updates.push('company = ?');
        values.push(customerData.company);
      }
      if (customerData.address !== undefined) {
        updates.push('address = ?');
        values.push(customerData.address);
      }
      if (customerData.status !== undefined) {
        updates.push('status = ?');
        values.push(customerData.status);
      }

      if (updates.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id);
      const query = `UPDATE customers SET ${updates.join(', ')} WHERE id = ?`;
      
      const [result] = await pool.execute(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error('CustomerDao.update error:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.execute('DELETE FROM customers WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (error) {
      console.error('CustomerDao.delete error:', error);
      throw error;
    }
  }
}

module.exports = CustomerDao;
