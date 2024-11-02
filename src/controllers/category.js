class CategoryController {
  constructor(logger, categoryService) {
    this.categoryService = categoryService;
    this.logger = logger;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Create category
  async create(req, res) {
    try {
      const { name } = req.body;

      const op = "controllers.category.create";
      const message = { op: op, name: name };
      this.logger.info("", message);

      if (name && name != "") {
        const data = { name: name };
        const category = await this.categoryService.create(data);
        res.status(201).json({
          status: "success",
          data: category,
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "The 'name' field is required and cannot be empty.",
        });
      }
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

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
      const id = req.params.id;

      const op = "controllers.category.getById";
      const message = { op: op, id: id };
      this.logger.info("", message);

      const category = await this.categoryService.getById(id);
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
      const { name } = req.body;
      const id = req.params.id;

      const op = "controllers.category.update";
      const message = { op: op, id: id, name: name };
      this.logger.info("", message);

      if (name && name != "") {
        const data = { name: name };
        const category = await this.categoryService.update(id, data);
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
      } else {
        res.status(400).json({
          status: "fail",
          message: "The 'name' field is required and cannot be empty.",
        });
      }
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
      const id = req.params.id

      const op = "controllers.category.delete";
      const message = { op: op, id: id };
      this.logger.info("", message);

      const category = await this.categoryService.delete(id);
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
}

module.exports = CategoryController;
