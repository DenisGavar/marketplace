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
}

module.exports = UserRepository;
