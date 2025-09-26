exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE claim_status_history, claims, users, roles RESTART IDENTITY CASCADE");
};
