class ProductController {
  constructor(logger, productService) {
    this.productService = productService;
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
      const op = "controllers.product.create";
      const message = { op: op, name: req.body.name };
      this.logger.info("", message);

      const product = await this.productService.create(req.body);
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
      const op = "controllers.product.getById";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const product = await this.productService.getById(req.params.id);
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
      const op = "controllers.product.update";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const product = await this.productService.update(
        req.params.id,
        req.body
      );
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
      const op = "controllers.product.delete";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const product = await this.productService.delete(req.params.id);
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
