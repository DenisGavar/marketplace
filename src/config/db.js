const sqlite3 = require("sqlite3");
const logger = require("../utils/logger");

let db;

function connectDB() {
  if (!db) {
    db = new sqlite3.Database(process.env.DB_FILENAME, (err) => {
      if (err) {
        logger.error("DB connection failed", err.message);
        throw err;
      } else {
        logger.info("DB connected");
      }
    });
  }
  return db;
}

module.exports = connectDB;
