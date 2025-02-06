const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "thinkpad",
  password: "1sampai8",
  database: "funfootball",
  synchronize: true,
  logging: true,
  entities: ["src/entity/*.js"],
  migrations: ["src/migration/*.js"],
});

module.exports = AppDataSource;
