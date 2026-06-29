const CustomerDao = require('../dao/customerDao');
const { AppError } = require('../../../middlewares/errorHandler');

class CustomerService {
  static async createCustomer(customerData, userId) {
    try {
      const customerId = await CustomerDao.create({
        ...customerData,
        created_by: userId
      });

      return { customerId };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AppError('Customer with this email already exists', 400, 'DUPLICATE_EMAIL');
      }
      throw error;
    }
  }

  static async getAllCustomers(page, limit, search) {
    try {
      return await CustomerDao.findAll(page, limit, search);
    } catch (error) {
      throw error;
    }
  }

  static async getCustomerById(id) {
    try {
      const customer = await CustomerDao.findById(id);
      
      if (!customer) {
        throw new AppError('Customer not found', 404, 'CUSTOMER_NOT_FOUND');
      }

      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async updateCustomer(id, customerData) {
    try {
      const affectedRows = await CustomerDao.update(id, customerData);

      if (affectedRows === 0) {
        throw new AppError('Customer not found', 404, 'CUSTOMER_NOT_FOUND');
      }

      return true;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AppError('Customer with this email already exists', 400, 'DUPLICATE_EMAIL');
      }
      throw error;
    }
  }

  static async deleteCustomer(id) {
    try {
      const affectedRows = await CustomerDao.delete(id);

      if (affectedRows === 0) {
        throw new AppError('Customer not found', 404, 'CUSTOMER_NOT_FOUND');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CustomerService;
