var validator = require("email-validator");

class VendorController {
  constructor(logger, vendorService) {
    this.vendorService = vendorService;
    this.logger = logger;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Create vendor
  async create(req, res) {
    try {
      const { name, email, rating } = req.body;

      const op = "controllers.vendor.create";
      const message = { op: op, name: name, email: email, rating: rating };
      this.logger.info("", message);

      let errMessage = "";
      if (!name || name === "") {
        errMessage += "The 'name' field is required and cannot be empty.\n";
      }

      if (!email || email === "" || !validator.validate(email)) {
        errMessage +=
          "The 'email' field is required, cannot be empty and must be of the correct format.\n";
      }

      if (!rating || typeof rating != "number") {
        errMessage += "The 'rating' field is required and must be a number.\n";
      }

      if (errMessage != "") {
        return res.status(400).json({
          status: "fail",
          message: errMessage,
        });
      }

      const data = { name: name, email: email, rating: rating };
      const vendor = await this.vendorService.create(data);
      res.status(201).json({
        status: "success",
        data: vendor,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get all vendors
  async getAll(req, res) {
    try {
      const op = "controllers.vendor.getAll";
      const message = { op: op };
      this.logger.info("", message);

      const vendors = await this.vendorService.getAll();
      res.status(200).json({
        status: "success",
        data: vendors,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get vendor by ID
  async getById(req, res) {
    try {
      const id = req.params.id;

      const op = "controllers.vendor.getById";
      const message = { op: op, id: id };
      this.logger.info("", message);

      const vendor = await this.vendorService.getById(id);
      if (!vendor) {
        return res.status(404).json({
          status: "fail",
          message: "vendor not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: vendor,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Update vendor
  async update(req, res) {
    try {
      const { name, email, rating } = req.body;
      const id = req.params.id;

      const op = "controllers.vendor.update";
      const message = { op: op, id: id, name: name, email: email, rating: rating };
      this.logger.info("", message);

      let errMessage = "";
      if (!name || name === "") {
        errMessage += "The 'name' field is required and cannot be empty.\n";
      }

      if (!email || email === "" || !validator.validate(email)) {
        errMessage +=
          "The 'email' field is required, cannot be empty and must be of the correct format.\n";
      }

      if (!rating || typeof rating != "number") {
        errMessage += "The 'rating' field is required and must be a number.\n";
      }

      if (errMessage != "") {
        return res.status(400).json({
          status: "fail",
          message: errMessage,
        });
      }

      const data = { name: name, email: email, rating: rating };
      const vendor = await this.vendorService.update(id, data);
      if (!vendor) {
        return res.status(404).json({
          status: "fail",
          message: "vendor not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: vendor,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Delete vendor
  async delete(req, res) {
    try {
      const id = req.params.id

      const op = "controllers.vendor.delete";
      const message = { op: op, id: id };
      this.logger.info("", message);

      const vendor = await this.vendorService.delete(id);
      if (!vendor) {
        return res.status(404).json({
          status: "fail",
          message: "vendor not found",
        });
      }
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
}

module.exports = VendorController;
