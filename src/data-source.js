const { DataSource } = require("typeorm");
require("dotenv").config();
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",
  synchronize: process.env.DB_DB_SYNC || true,
  logging: process.env.DB_LOGGING || true,
  entities: ["src/entity/*.js"],
  migrations: ["src/migration/*.js"],
});

module.exports = AppDataSource;
