var validator = require("email-validator");

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
      const { name, email, password } = req.body;

      const op = "controllers.user.create";
      const message = { op: op, name: name, email: email };
      this.logger.info("", message);

      let errMessage = "";
      if (!name || name === "") {
        errMessage += "The 'name' field is required and cannot be empty.\n";
      }

      if (!email || email === "" || !validator.validate(email)) {
        errMessage +=
          "The 'email' field is required, cannot be empty and must be of the correct format.\n";
      }

      if (!password || password === "") {
        errMessage += "The 'password' field is required and cannot be empty.\n";
      }

      if (errMessage != "") {
        return res.status(400).json({
          status: "fail",
          message: errMessage,
        });
      }

      const data = { name: name, email: email, password: password };
      const user = await this.userService.create(data);
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
      const { email, password } = req.body;

      const op = "controllers.user.signIn";
      const message = { op: op, email: email };
      this.logger.info("", message);

      let errMessage = "";

      if (!email || email === "" || !validator.validate(email)) {
        errMessage +=
          "The 'email' field is required, cannot be empty and must be of the correct format.\n";
      }

      if (!password || password === "") {
        errMessage += "The 'password' field is required and cannot be empty.\n";
      }

      if (errMessage != "") {
        return res.status(400).json({
          status: "fail",
          message: errMessage,
        });
      }

      const data = { email: email, password: password };
      const { name, token } = await this.userService.signIn(data);
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
