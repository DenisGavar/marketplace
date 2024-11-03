class ProductController {
  constructor(logger, productService, vendorService, categoryService) {
    this.productService = productService;
    this.vendorService = vendorService;
    this.categoryService = categoryService;
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
      const { name, description, price, vendorId, categories } = req.body;

      const op = "controllers.product.create";
      const message = {
        op: op,
        name: name,
        price: price,
        vendorId: vendorId,
        categories: categories,
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

      if (categories && categories.length != 0) {
        let line = 0;
        for (const category of categories) {
          const { categoryId } = category;
          line++;

          if (categoryId) {
            const category = await this.categoryService.getById(categoryId);
            if (!category) {
              errMessage += `Category with id ${categoryId} in line ${line} not found.\n`;
            }
          } else {
            errMessage += `The 'categoryId' field in line ${line} is required.\n`;
          }
        }
      } else {
        errMessage += "The 'categories' field is required.\n";
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
        categories: categories,
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
      const { name, description, price, vendorId, categories } = req.body;
      const id = req.params.id;

      const op = "controllers.product.update";
      const message = {
        op: op,
        id: id,
        name: name,
        price: price,
        vendorId: vendorId,
        categories: categories,
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

      if (categories && categories.length != 0) {
        let line = 0;
        for (const category of categories) {
          const { categoryId } = category;
          line++;

          if (categoryId) {
            const category = await this.categoryService.getById(categoryId);
            if (!category) {
              errMessage += `Category with id ${categoryId} in line ${line} not found.\n`;
            }
          } else {
            errMessage += `The 'categoryId' field in line ${line} is required.\n`;
          }
        }
      } else {
        errMessage += "The 'categories' field is required.\n";
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
        categories: categories,
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
