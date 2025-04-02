require("dotenv").config(); // Load environment variables

module.exports = {
  development: {
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || null,
    database: process.env.MYSQL_DATABASE || "recipe_finder_db",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.MYSQL_PORT || 3306
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    port: process.env.MYSQL_PORT
  }
};
