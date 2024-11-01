const express = require("express");
const container = require("../infrastructure/container");
const router = express.Router();

container.then(({ vendorController }) => {
  // CRUD routes for Vendor
  router.post("/", vendorController.create); // Create vendor
  router.get("/", vendorController.getAll); // Get all vendors
  router.get("/:id", vendorController.getById); // Get vendor by ID
  router.put("/:id", vendorController.update); // Update vendor by ID
  router.delete("/:id", vendorController.delete); // Delete vendor by ID
});

module.exports = router;
