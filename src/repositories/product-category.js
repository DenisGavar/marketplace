class ProductCategoryRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(productId, categoryId) {
    const op = "repositories.product-category.create";
    const message = {
      op: op,
      productId: productId,
      categoryId: categoryId,
    };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO product_categories (productId, categoryId) VALUES (?, ?)`;
      this.db.run(query, [productId, categoryId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }

  async delete(productId, categoryId) {
    const op = "repositories.product-category.delete";
    const message = { op: op, productId: productId, categoryId: categoryId };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM product_categories
        WHERE productId = ? AND categoryId = ?
        `;
      this.db.run(query, [productId, categoryId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
}

module.exports = ProductCategoryRepository;
