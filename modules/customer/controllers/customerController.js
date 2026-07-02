const CustomerService = require("../services/customerService");
const Response = require("../../../responses/responses");
const { asyncHandler } = require("../../../middlewares/errorHandler");
const logger = require("../../../logging/logging");

class CustomerController {
  static createCustomer = asyncHandler(async (req, res) => {
    const apiReference = {
      module: "customer",
      api: "createCustomer",
      apiId: req.apiId,
    };
    logger.log(apiReference, "Create customer request", {
      name: req.body.name,
      email: req.body.email,
    });

    const { name, email, phone, company, address, status } = req.body;

    const result = await CustomerService.createCustomer(
      { name, email, phone, company, address, status },
      req.user.id,
    );

    logger.log(apiReference, "Customer created successfully", {
      customerId: result.id,
    });
    Response.created(res, result, "Customer created successfully");
  });

  static getAllCustomers = asyncHandler(async (req, res) => {
    const apiReference = { module: "customer", api: "getAllCustomers" };
    logger.log(apiReference, "Get all customers request", {
      page: req.query.page,
      limit: req.query.limit,
    });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await CustomerService.getAllCustomers(page, limit, search);

    logger.log(apiReference, "Customers retrieved successfully", {
      count: result.data.length,
    });
    Response.paginated(
      res,
      result.data,
      result.pagination,
      "Customers retrieved successfully",
    );
  });

  static getCustomerById = asyncHandler(async (req, res) => {
    const apiReference = { module: "customer", api: "getCustomerById" };
    const { id } = req.params;
    logger.log(apiReference, "Get customer by ID request", { customerId: id });

    const customer = await CustomerService.getCustomerById(id);

    logger.log(apiReference, "Customer retrieved successfully", {
      customerId: id,
    });
    Response.success(res, customer, "Customer retrieved successfully");
  });

  static updateCustomer = asyncHandler(async (req, res) => {
    const apiReference = { module: "customer", api: "updateCustomer" };
    const { id } = req.params;
    logger.log(apiReference, "Update customer request", { customerId: id });

    const { name, email, phone, company, address, status } = req.body;

    await CustomerService.updateCustomer(id, {
      name,
      email,
      phone,
      company,
      address,
      status,
    });

    logger.log(apiReference, "Customer updated successfully", {
      customerId: id,
    });
    Response.success(res, null, "Customer updated successfully");
  });

  static deleteCustomer = asyncHandler(async (req, res) => {
    const apiReference = { module: "customer", api: "deleteCustomer" };
    const { id } = req.params;
    logger.log(apiReference, "Delete customer request", { customerId: id });

    await CustomerService.deleteCustomer(id);

    logger.log(apiReference, "Customer deleted successfully", {
      customerId: id,
    });
    Response.success(res, null, "Customer deleted successfully");
  });
}

module.exports = CustomerController;
