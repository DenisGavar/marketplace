// pattern: Dependency Injection Container
const connectDB = require("../config/db");
const logger = require("../utils/logger");

const Transactor = require("../utils/transactor");

const UserRepository = require("../repositories/user");
const UserService = require("../services/user");
const UserController = require("../controllers/user");

const VendorRepository = require("../repositories/vendor");
const VendorService = require("../services/vendor");
const VendorController = require("../controllers/vendor");

const CategoryRepository = require("../repositories/category");
const CategoryService = require("../services/category");
const CategoryController = require("../controllers/category");

const ProductCategoryRepository = require("../repositories/product-category");

const ProductRepository = require("../repositories/product");
const ProductService = require("../services/product");
const ProductController = require("../controllers/product");

const OrderRepository = require("../repositories/order");
const OrderService = require("../services/order");
const OrderController = require("../controllers/order");

const OrderDetailRepository = require("../repositories/order-detail");

const container = async () => {
  const db = await connectDB();

  const transactor = new Transactor(db);

  const userRepository = new UserRepository(logger, db);
  const userService = new UserService(logger, userRepository);
  const userController = new UserController(logger, userService);

  const vendorRepository = new VendorRepository(logger, db);
  const vendorService = new VendorService(logger, vendorRepository);
  const vendorController = new VendorController(logger, vendorService);

  const categoryRepository = new CategoryRepository(logger, db);
  const categoryService = new CategoryService(logger, categoryRepository);
  const categoryController = new CategoryController(logger, categoryService);

  const productCategoryRepository = new ProductCategoryRepository(logger, db);

  const productRepository = new ProductRepository(logger, db);
  const productService = new ProductService(
    logger,
    productRepository,
    productCategoryRepository,
    transactor
  );
  const productController = new ProductController(
    logger,
    productService,
    vendorService,
    categoryService
  );

  const orderDetailRepository = new OrderDetailRepository(logger, db);

  const orderRepository = new OrderRepository(logger, db);
  const orderService = new OrderService(
    logger,
    orderRepository,
    orderDetailRepository,
    productRepository,
    transactor
  );
  const orderController = new OrderController(
    logger,
    orderService,
    userService,
    productService
  );

  const container = {
    userController: userController,
    vendorController: vendorController,
    productController: productController,
    categoryController: categoryController,
    orderController: orderController,
  };

  return container;
};

module.exports = container();
