exports.seed = async function (knex) {
  await knex("roles").insert([
    {
      name: "user",
      description: "Standard claimant with access to personal claims",
    },
    {
      name: "admin",
      description: "Administrator with access to all claims and management tools",
    },
  ]);
};
