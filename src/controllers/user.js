class UserController {
  constructor(logger, userService) {
    this.userService = userService;
    this.logger = logger;

    this.create = this.create.bind(this);
    this.signIn = this.signIn.bind(this);
    /*
      this.getAll = this.getAll.bind(this);
      this.getById = this.getById.bind(this);
      this.update = this.update.bind(this);
      this.delete = this.delete.bind(this);
      */
  }

  // Create user
  async create(req, res) {
    try {
      const op = "controllers.user.create";
      const message = { op: op, email: req.body.email };
      this.logger.info("", message);

      const user = await this.userService.create(req.body);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async signIn(req, res) {
    try {
      const op = "controllers.user.signIn";
      const message = { op: op, email: req.body.email };
      this.logger.info("", message);

      const { name, token } = await this.userService.signIn(req.body);
      res.cookie("jwt", token, { httpOnly: true });
      res.status(201).json({
        status: "success",
        data: name,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        mesage: err.message,
      });
    }
  }

  /*
    // Get all categories
    async getAll(req, res) {
      try {
        const op = "controllers.category.getAll";
        const message = { op: op };
        this.logger.info("", message);
  
        const categories = await this.categoryService.getAll();
        res.status(200).json({
          status: "success",
          data: categories,
        });
      } catch (err) {
        this.logger.error(err);
        res.status(400).json({
          status: "fail",
          message: err.message,
        });
      }
    }
  
    // Get category by ID
    async getById(req, res) {
      try {
        const op = "controllers.category.getById";
        const message = { op: op, id: req.params.id };
        this.logger.info("", message);
  
        const category = await this.categoryService.getById(req.params.id);
        if (!category) {
          return res.status(404).json({
            status: "fail",
            message: "Category not found",
          });
        }
        res.status(200).json({
          status: "success",
          data: category,
        });
      } catch (err) {
        this.logger.error(err);
        res.status(400).json({
          status: "fail",
          message: err.message,
        });
      }
    }
  
    // Update category
    async update(req, res) {
      try {
        const op = "controllers.category.update";
        const message = { op: op, id: req.params.id };
        this.logger.info("", message);
  
        const category = await this.categoryService.update(
          req.params.id,
          req.body
        );
        if (!category) {
          return res.status(404).json({
            status: "fail",
            message: "Category not found",
          });
        }
        res.status(200).json({
          status: "success",
          data: category,
        });
      } catch (err) {
        this.logger.error(err);
        res.status(400).json({
          status: "fail",
          message: err.message,
        });
      }
    }
  
    // Delete category
    async delete(req, res) {
      try {
        const op = "controllers.category.delete";
        const message = { op: op, id: req.params.id };
        this.logger.info("", message);
  
        const category = await this.categoryService.delete(req.params.id);
        if (!category) {
          return res.status(404).json({
            status: "fail",
            message: "Category not found",
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
      */
}

module.exports = UserController;
