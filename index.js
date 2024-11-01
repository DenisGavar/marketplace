require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const categoryRoutes = require("./src/routes/category");
const orderRoutes = require("./src/routes/order");
const userRoutes = require("./src/routes/user");
const authenticate = require("./src/middlewares/auth")

const logger = require("./src/utils/logger");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Routes to sign up/in
app.use("/api/v1", userRoutes);

// Middleware to authenticate
app.use(authenticate);

// Routes to access the information
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info("Listening", { port: port });
});
