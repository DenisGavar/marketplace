class OrderController {
  constructor(logger, orderService, userService, productService) {
    this.orderService = orderService;
    this.userService = userService;
    this.productService = productService;
    this.logger = logger;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Create order
  async create(req, res) {
    try {
      const { userId, products } = req.body;

      const op = "controllers.order.create";
      const message = { op: op, userId: userId, products: products };
      this.logger.info("", message);

      let errMessage = "";
      if (userId) {
        const user = await this.userService.getById(userId);
        if (!user) {
          errMessage += `User with id ${userId} not found.\n`;
        }
      } else {
        errMessage += "The 'userId' field is required.\n";
      }

      if (products && products.length != 0) {
        let line = 0;
        for (const product of products) {
          const { productId, quantity } = product;
          line++;

          if (productId) {
            const product = await this.productService.getById(productId);
            if (!product) {
              errMessage += `Product with id ${productId} in line ${line} not found.\n`;
            }
          } else {
            errMessage += `The 'productId' field in line ${line} is required.\n`;
          }

          if (!quantity || typeof quantity != "number") {
            errMessage += `The 'quantity' field in line ${line} is required and must be a number.\n`;
          }
        }
      } else {
        errMessage += "The 'products' field is required.\n";
      }

      if (errMessage != "") {
        return res.status(400).json({
          status: "fail",
          message: errMessage,
        });
      }

      const data = { userId: userId, products: products };
      const order = await this.orderService.create(data);
      res.status(201).json({
        status: "success",
        data: order,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get all orders
  async getAll(req, res) {
    try {
      const op = "controllers.order.getAll";
      const message = { op: op };
      this.logger.info("", message);

      const orders = await this.orderService.getAll();
      res.status(200).json({
        status: "success",
        data: orders,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get order by ID
  async getById(req, res) {
    try {
      const id = req.params.id;

      const op = "controllers.order.getById";
      const message = { op: op, id: id };
      this.logger.info("", message);

      const order = await this.orderService.getById(id);
      if (!order) {
        return res.status(404).json({
          status: "fail",
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Update order
  async update(req, res) {
    try {
      const { userId, products } = req.body;
      const id = req.params.id;

      const op = "controllers.order.update";
      const message = { op: op, id: id, userId: userId, products: products };
      this.logger.info("", message);

      let errMessage = "";
      if (userId) {
        const user = await this.userService.getById(userId);
        if (!user) {
          errMessage += `User with id ${userId} not found.\n`;
        }
      } else {
        errMessage += "The 'userId' field is required.\n";
      }

      if (products && products.length != 0) {
        let line = 0;
        for (const product of products) {
          const { productId, quantity } = product;
          line++;

          if (productId) {
            const product = await this.productService.getById(productId);
            if (!product) {
              errMessage += `Product with id ${productId} in line ${line} not found.\n`;
            }
          } else {
            errMessage += `The 'productId' field in line ${line} is required.\n`;
          }

          if (!quantity || typeof quantity != "number") {
            errMessage += `The 'quantity' field in line ${line} is required and must be a number.\n`;
          }
        }
      } else {
        errMessage += "The 'products' field is required.\n";
      }

      if (errMessage != "") {
        return res.status(400).json({
          status: "fail",
          message: errMessage,
        });
      }

      const data = { userId: userId, products: products };
      const order = await this.orderService.update(id, data);
      if (!order) {
        return res.status(404).json({
          status: "fail",
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Delete order
  async delete(req, res) {
    try {
      const id = req.params.id;

      const op = "controllers.order.delete";
      const message = { op: op, id: id };
      this.logger.info("", message);

      const order = await this.orderService.delete(id);
      if (!order) {
        return res.status(404).json({
          status: "fail",
          message: "Order not found",
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

module.exports = OrderController;
