const knex = require("knex");
const env = require("../config/env");
const knexfile = require("../../db/knexfile");

const baseConfig = knexfile[env.nodeEnv] || knexfile.development;
const connection = env.databaseUrl || baseConfig.connection;

const db = knex({
  ...baseConfig,
  connection,
});

module.exports = db;
