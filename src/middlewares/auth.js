const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;

  const op = "middlewares.auth.authenticate";
  const message = { op: op, token: token };
  logger.info("", message);

  if (!token) {
    logger.info("Empty token");
    return res.status(401).json({
      status: "fail",
      message: "Empty token",
    });
  }

  try {
    secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.decoded = decoded;
    logger.info("Authenticated", { decoded: decoded });
    next();
  } catch (err) {
    logger.info("Invalid token");
    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

module.exports = authenticate;
