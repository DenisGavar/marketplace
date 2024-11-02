require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./src/routes/user");
const authenticate = require("./src/middlewares/auth");
const vendorRoutes = require("./src/routes/vendor");
const productRoutes = require("./src/routes/product");
const categoryRoutes = require("./src/routes/category");
const orderRoutes = require("./src/routes/order");

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
app.use("/api/v1/vendors", vendorRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info("Listening", { port: port });
});

// TODO:
// rewrite documentation (technologies, contracts)
// add frontend part (update documentation)
// add product_categories CRUD (maybe add to the product create/get/update) (update documentation)
// add vendor name for product get response

// add not full update (you don't need to pass all parameters, but only the updated ones) (update documentation)
// add tests (user, vendor, product, order) (update documentation)
// change db (PostgreSQL or MySQL), because there are some problems to deploy app with SQLite
// add deploy (update documentation)