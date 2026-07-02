const express = require("express");
const router = express.Router();
const LeadController = require("./controllers/leadController");
const {
  authMiddleware,
  checkVerified,
  validate,
} = require("../../middlewares");
const {
  createLeadValidation,
  updateLeadValidation,
} = require("./validators/leadValidator");
const requestIdMiddleware = require("../../middlewares/requestIdMiddleware");

// All lead routes require authentication and verification
router.use(authMiddleware);
router.use(checkVerified);
router.use(requestIdMiddleware);

// Lead routes
router.post("/", validate(createLeadValidation), LeadController.createLead);
router.get("/", LeadController.getAllLeads);
router.get("/:id", LeadController.getLeadById);
router.put("/:id", validate(updateLeadValidation), LeadController.updateLead);
router.delete("/:id", LeadController.deleteLead);

module.exports = router;
