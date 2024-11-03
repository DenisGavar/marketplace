class OrderRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(data) {
    const { userId, totalPrice } = data;

    const op = "repositories.order.create";
    const message = { op: op, userId: userId, totalPrice: totalPrice };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO orders (userId, totalPrice) VALUES (?, ?)`;
      this.db.run(query, [userId, totalPrice], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }

  async getAll() {
    const op = "repositories.order.getAll";
    const message = { op: op };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `
      SELECT
        orders.id as orderId,
        orders.totalPrice,
        orders.userId,
        users.name as userName, 
        order_details.productId,
        products.name as productName,
        order_details.quantity,
        order_details.price
      FROM orders as orders
      LEFT JOIN users as users ON orders.userId = users.id
      LEFT JOIN order_details as order_details ON orders.id = order_details.orderId
      LEFT JOIN products as products ON order_details.productId = products.id
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
    const op = "repositories.order.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `
      SELECT
        orders.id as orderId,
        orders.totalPrice,
        orders.userId,
        users.name as userName, 
        order_details.productId,
        products.name as productName,
        order_details.quantity,
        order_details.price
      FROM orders as orders
      LEFT JOIN users as users ON orders.userId = users.id
      LEFT JOIN order_details as order_details ON orders.id = order_details.orderId
      LEFT JOIN products as products ON order_details.productId = products.id
      WHERE orders.id = ?
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
    const op = "repositories.order.update";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const { totalPrice } = data;

    return new Promise((resolve, reject) => {
      const query = `UPDATE orders SET totalPrice = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      this.db.run(query, [totalPrice, id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }

  async delete(id) {
    const op = "repositories.order.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `DELETE FROM orders WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
}

module.exports = OrderRepository;
