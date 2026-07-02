const LeadDao = require("../dao/leadDao");
const { AppError } = require("../../../middlewares/errorHandler");
const pool = require("../../../database/mysqllib").getPool();

class LeadService {
  static async normalizeLeadData(leadData) {
    const normalizedLeadData = { ...leadData };

    if (
      normalizedLeadData.assigned_to === undefined ||
      normalizedLeadData.assigned_to === null ||
      normalizedLeadData.assigned_to === "" ||
      normalizedLeadData.assigned_to === "null"
    ) {
      normalizedLeadData.assigned_to = null;
      return normalizedLeadData;
    }

    const parsedAssignedTo = Number.parseInt(
      normalizedLeadData.assigned_to,
      10,
    );

    if (!Number.isInteger(parsedAssignedTo) || parsedAssignedTo <= 0) {
      normalizedLeadData.assigned_to = null;
      return normalizedLeadData;
    }

    const [rows] = await pool.execute("SELECT id FROM users WHERE id = ?", [
      parsedAssignedTo,
    ]);
    normalizedLeadData.assigned_to = rows.length ? parsedAssignedTo : null;

    return normalizedLeadData;
  }

  static async createLead(leadData, userId) {
    try {
      const normalizedLeadData = await this.normalizeLeadData({
        ...leadData,
        created_by: userId,
      });
      const leadId = await LeadDao.create(normalizedLeadData);

      return { leadId, id: leadId };
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
        throw new AppError("Lead not found", 404, "LEAD_NOT_FOUND");
      }

      return lead;
    } catch (error) {
      throw error;
    }
  }

  static async updateLead(id, leadData) {
    try {
      const normalizedLeadData = await this.normalizeLeadData(leadData);
      const affectedRows = await LeadDao.update(id, normalizedLeadData);

      if (affectedRows === 0) {
        throw new AppError("Lead not found", 404, "LEAD_NOT_FOUND");
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
        throw new AppError("Lead not found", 404, "LEAD_NOT_FOUND");
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LeadService;
