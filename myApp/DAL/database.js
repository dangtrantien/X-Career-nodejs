const config = require("../config/db_config.json");
const mongoose = require("mongoose");
class Database {
  constructor() {}

  connect = async () => {
    await mongoose.connect(config.connectionString);
  };
}

module.exports = Database;
