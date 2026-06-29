const LeadService = require('../services/leadService');
const Response = require('../../../responses/responses');
const { asyncHandler } = require('../../../middlewares/errorHandler');
const logger = require('../../../logging/logging');

class LeadController {
  static createLead = asyncHandler(async (req, res) => {
    const apiReference = { module: 'lead', api: 'createLead', apiId : req.apiId };
    logger.log(apiReference, 'Create lead request', { name: req.body.name, email: req.body.email, apiId : req.apiId});
    
    const { name, email, phone, company, source, status, notes, assigned_to } = req.body;

    const result = await LeadService.createLead(
      { name, email, phone, company, source, status, notes, assigned_to },
      req.user.id
    );

    logger.log(apiReference, 'Lead created successfully', { leadId: result.id });
    Response.created(res, result, 'Lead created successfully');
  });

  static getAllLeads = asyncHandler(async (req, res) => {
    const apiReference = { module: 'lead', api: 'getAllLeads' };
    logger.log(apiReference, 'Get all leads request', { page: req.query.page, limit: req.query.limit });
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';

    const result = await LeadService.getAllLeads(page, limit, search, status);

    logger.log(apiReference, 'Leads retrieved successfully', { count: result.data.length });
    Response.paginated(res, result.data, result.pagination, 'Leads retrieved successfully');
  });

  static getLeadById = asyncHandler(async (req, res) => {
    const apiReference = { module: 'lead', api: 'getLeadById' };
    const { id } = req.params;
    logger.log(apiReference, 'Get lead by ID request', { leadId: id });

    const lead = await LeadService.getLeadById(id);

    logger.log(apiReference, 'Lead retrieved successfully', { leadId: id });
    Response.success(res, lead, 'Lead retrieved successfully');
  });

  static updateLead = asyncHandler(async (req, res) => {
    const apiReference = { module: 'lead', api: 'updateLead' };
    const { id } = req.params;
    logger.log(apiReference, 'Update lead request', { leadId: id });
    
    const { name, email, phone, company, source, status, notes, assigned_to } = req.body;

    await LeadService.updateLead(id, {
      name, email, phone, company, source, status, notes, assigned_to
    });

    logger.log(apiReference, 'Lead updated successfully', { leadId: id });
    Response.success(res, null, 'Lead updated successfully');
  });

  static deleteLead = asyncHandler(async (req, res) => {
    const apiReference = { module: 'lead', api: 'deleteLead' };
    const { id } = req.params;
    logger.log(apiReference, 'Delete lead request', { leadId: id });

    await LeadService.deleteLead(id);

    logger.log(apiReference, 'Lead deleted successfully', { leadId: id });
    Response.success(res, null, 'Lead deleted successfully');
  });
}

module.exports = LeadController;
