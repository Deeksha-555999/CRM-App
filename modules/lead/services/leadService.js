const LeadDao = require('../dao/leadDao');
const { AppError } = require('../../../middlewares/errorHandler');

class LeadService {
  static async createLead(leadData, userId) {
    try {
      const leadId = await LeadDao.create({
        ...leadData,
        created_by: userId
      });

      return { leadId };
    } catch (error) {
      throw error;
    }
  }

  static async getAllLeads(page, limit, search, status) {
    try {
      return await LeadDao.findAll(page, limit, search, status);
    } catch (error) {
      throw error;
    }
  }

  static async getLeadById(id) {
    try {
      const lead = await LeadDao.findById(id);
      
      if (!lead) {
        throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND');
      }

      return lead;
    } catch (error) {
      throw error;
    }
  }

  static async updateLead(id, leadData) {
    try {
      const affectedRows = await LeadDao.update(id, leadData);

      if (affectedRows === 0) {
        throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async deleteLead(id) {
    try {
      const affectedRows = await LeadDao.delete(id);

      if (affectedRows === 0) {
        throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LeadService;
