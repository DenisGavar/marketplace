class UserRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(data) {
    const { name, email, password } = data;

    const op = "repositories.user.create";
    const message = { op: op, name: name, email: email };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      this.db.run(query, [name, email, password], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }

  async getByEmail(email) {
    const op = "repositories.user.getByEmail";
    const message = { op: op, email: email };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = ?`;
      this.db.get(query, [email], function (err, row) {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  } 

  /*
  async getAll() {
    const op = "repositories.category.getAll";
    const message = { op: op };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM categories`;
      this.db.all(query, [], function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async getById(id) {
    const op = "repositories.category.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM categories WHERE id = ?`;
      this.db.get(query, [id], function (err, row) {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  async update(id, data) {
    const op = "repositories.category.update";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const { name } = data;

    return new Promise((resolve, reject) => {
      const query = `UPDATE categories SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      this.db.run(query, [name, id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }

  async delete(id) {
    const op = "repositories.category.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `DELETE FROM categories WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
    */
}

module.exports = UserRepository;
