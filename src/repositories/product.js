class ProductRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(data) {
    const { name, description, price, vendorId } = data;

    const op = "repositories.product.create";
    const message = { op: op, name: name, price: price, vendorId: vendorId };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO products (name, description, price, vendorId) VALUES (?, ?, ?, ?)`;
      this.db.run(query, [name, description, price, vendorId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }

  async getAll() {
    const op = "repositories.product.getAll";
    const message = { op: op };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `
      SELECT      
        products.id as productId,
        products.name,
        products.description,
        products.price, 
        vendors.id as vendorId,
        vendors.name as vendorName,
        categories.id as categoryId,
        categories.name as categoryName
      FROM products as products
      LEFT JOIN product_categories as product_categories ON products.id = product_categories.productId
        LEFT JOIN categories as categories ON product_categories.categoryId = categories.id
      LEFT JOIN vendors as vendors ON products.vendorId = vendors.id
    `;

      this.db.all(query, [], function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async getById(id) {
    const op = "repositories.product.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `
      SELECT      
        products.id as productId,
        products.name,
        products.description,
        products.price, 
        vendors.id as vendorId,
        vendors.name as vendorName,
        categories.id as categoryId,
        categories.name as categoryName
      FROM products as products
      LEFT JOIN product_categories as product_categories ON products.id = product_categories.productId
        LEFT JOIN categories as categories ON product_categories.categoryId = categories.id
      LEFT JOIN vendors as vendors ON products.vendorId = vendors.id
      WHERE products.id = ?
    `;

      this.db.all(query, [id], function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async update(id, data) {
    const { name, description, price, vendorId } = data;

    const op = "repositories.product.update";
    const message = {
      op: op,
      id: id,
      name: name,
      price: price,
      vendorId: vendorId,
    };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `UPDATE products SET name = ?, description = ?, price = ?, vendorId = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      this.db.run(
        query,
        [name, description, price, vendorId, id],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve(this.changes);
        }
      );
    });
  }

  async delete(id) {
    const op = "repositories.product.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `DELETE FROM products WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
}

module.exports = ProductRepository;
