class VendorRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(data) {
    const { name, email, rating } = data;

    const op = "repositories.vendor.create";
    const message = { op: op, name: name, email: email, rating: rating };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO vendors (name, email, rating) VALUES (?, ?, ?)`;
      this.db.run(query, [name, email, rating], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }

  async getAll() {
    const op = "repositories.vendor.getAll";
    const message = { op: op };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM vendors`;
      this.db.all(query, [], function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async getById(id) {
    const op = "repositories.vendor.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM vendors WHERE id = ?`;
      this.db.get(query, [id], function (err, row) {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  async update(id, data) {
    const { name, email, rating } = data;

    const op = "repositories.vendor.update";
    const message = {
      op: op,
      id: id,
      name: name,
      email: email,
      rating: rating,
    };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `UPDATE vendors SET name = ?, email = ?, rating = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      this.db.run(query, [name, email, rating, id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }

  async delete(id) {
    const op = "repositories.vendor.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `DELETE FROM vendors WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
}

module.exports = VendorRepository;
