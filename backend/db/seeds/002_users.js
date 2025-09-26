const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  const [userRole] = await knex("roles").select("id").where({ name: "user" }).limit(1);
  const [adminRole] = await knex("roles").select("id").where({ name: "admin" }).limit(1);

  if (!userRole || !adminRole) {
    throw new Error("Roles must be seeded before seeding users");
  }

  const password = await bcrypt.hash("ChangeMe123!", 10);

  await knex("users").insert([
    {
      email: "admin@example.com",
      password_hash: password,
      full_name: "Admin User",
      role_id: adminRole.id,
    },
    {
      email: "user@example.com",
      password_hash: password,
      full_name: "Sample User",
      role_id: userRole.id,
    },
  ]);
};
