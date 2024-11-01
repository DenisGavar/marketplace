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
      const op = "controllers.vendor.create";
      const message = { op: op, name: req.body.name };
      this.logger.info("", message);

      const vendor = await this.vendorService.create(req.body);
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
      const op = "controllers.vendor.getById";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const vendor = await this.vendorService.getById(req.params.id);
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
      const op = "controllers.vendor.update";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const vendor = await this.vendorService.update(
        req.params.id,
        req.body
      );
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
      const op = "controllers.vendor.delete";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const vendor = await this.vendorService.delete(req.params.id);
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
