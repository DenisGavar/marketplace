class UserController {
  constructor(logger, userService) {
    this.userService = userService;
    this.logger = logger;

    this.create = this.create.bind(this);
    this.signIn = this.signIn.bind(this);
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

  // Sign in user
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
}

module.exports = UserController;
