const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const defaultConnection =
  process.env.DATABASE_URL || "postgres://localhost:5432/fra_atlas_dev";

const baseDirs = {
  migrations: path.resolve(__dirname, "migrations"),
  seeds: path.resolve(__dirname, "seeds"),
};

module.exports = {
  development: {
    client: "pg",
    connection: defaultConnection,
    pool: { min: 1, max: 10 },
    migrations: {
      directory: baseDirs.migrations,
      tableName: "knex_migrations",
    },
    seeds: {
      directory: baseDirs.seeds,
    },
  },
  test: {
    client: "pg",
    connection:
      process.env.TEST_DATABASE_URL || "postgres://localhost:5432/fra_atlas_test",
    pool: { min: 1, max: 5 },
    migrations: {
      directory: baseDirs.migrations,
      tableName: "knex_migrations",
    },
    seeds: {
      directory: baseDirs.seeds,
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 20 },
    migrations: {
      directory: baseDirs.migrations,
      tableName: "knex_migrations",
    },
    seeds: {
      directory: baseDirs.seeds,
    },
  },
};
