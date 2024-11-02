class ProductController {
  constructor(logger, productService, vendorService) {
    this.productService = productService;
    this.vendorService = vendorService;
    this.logger = logger;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Create product
  async create(req, res) {
    try {
      const { name, description, price, vendorId } = req.body;

      const op = "controllers.product.create";
      const message = { op: op, name: name, price: price, vendorId: vendorId };
      this.logger.info("", message);

      let errMessage = "";
      if (!name || name === "") {
        errMessage += "The 'name' field is required and cannot be empty.\n";
      }

      if (!description) {
        errMessage += "The 'description' field is required.\n";
      }

      if (!price || typeof price != "number") {
        errMessage += "The 'price' field is required and must be a number.\n";
      }

      if (vendorId) {
        const vendor = await this.vendorService.getById(vendorId);
        if (!vendor) {
          errMessage += `Vendor with id ${vendorId} not found.\n`;
        }
      } else {
        errMessage += "The 'vendorId' field is required.\n";
      }

      if (errMessage != "") {
        return res.status(400).json({
          status: "fail",
          message: errMessage,
        });
      }

      const data = {
        name: name,
        description: description,
        price: price,
        vendorId: vendorId,
      };
      const product = await this.productService.create(data);
      res.status(201).json({
        status: "success",
        data: product,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get all products
  async getAll(req, res) {
    try {
      const op = "controllers.product.getAll";
      const message = { op: op };
      this.logger.info("", message);

      const products = await this.productService.getAll();
      res.status(200).json({
        status: "success",
        data: products,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get product by ID
  async getById(req, res) {
    try {
      const id = req.params.id;

      const op = "controllers.product.getById";
      const message = { op: op, id: id };
      this.logger.info("", message);

      const product = await this.productService.getById(id);
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: "product not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: product,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Update product
  async update(req, res) {
    try {
      const { name, description, price, vendorId } = req.body;
      const id = req.params.id;

      const op = "controllers.product.update";
      const message = {
        op: op,
        id: id,
        name: name,
        price: price,
        vendorId: vendorId,
      };
      this.logger.info("", message);

      let errMessage = "";
      if (!name || name === "") {
        errMessage += "The 'name' field is required and cannot be empty.\n";
      }

      if (!description) {
        errMessage += "The 'description' field is required.\n";
      }

      if (!price || typeof price != "number") {
        errMessage += "The 'price' field is required and must be a number.\n";
      }

      if (vendorId) {
        const vendor = await this.vendorService.getById(vendorId);
        if (!vendor) {
          errMessage += `Vendor with id ${vendorId} not found.\n`;
        }
      } else {
        errMessage += "The 'vendorId' field is required.\n";
      }

      if (errMessage != "") {
        return res.status(400).json({
          status: "fail",
          message: errMessage,
        });
      }

      const data = {
        name: name,
        description: description,
        price: price,
        vendorId: vendorId,
      };
      const product = await this.productService.update(id, data);
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: "product not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: product,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Delete product
  async delete(req, res) {
    try {
      const id = req.params.id;

      const op = "controllers.product.delete";
      const message = { op: op, id: id };
      this.logger.info("", message);

      const product = await this.productService.delete(id);
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: "product not found",
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

module.exports = ProductController;
