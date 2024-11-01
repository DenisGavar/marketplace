const express = require("express");
const container = require("../infrastructure/container");
const router = express.Router();

container.then(({ productController }) => {
  // CRUD routes for Product
  router.post("/", productController.create); // Create product
  router.get("/", productController.getAll); // Get all products
  router.get("/:id", productController.getById); // Get product by ID
  router.put("/:id", productController.update); // Update product by ID
  router.delete("/:id", productController.delete); // Delete product by ID
});

module.exports = router;
