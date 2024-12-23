const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  constructor(logger, userRepository) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async create(data) {
    const op = "services.user.create";
    const message = { op: op };
    this.logger.info("", message);

    // hash password
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    data.password = await bcrypt.hash(data.password, saltRounds);

    const user = await this.userRepository.create(data);
    return user;
  }

  async signIn(data) {
    const op = "services.user.signIn";
    const message = { op: op, email: data.email };
    this.logger.info("", message);

    const user = await this.userRepository.getByEmail(data.email);

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const { name, id } = user;
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { name, token };
  }

  async getById(id) {
    const op = "services.user.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await this.userRepository.getById(id);
    return user;
  }
}

module.exports = UserService;
