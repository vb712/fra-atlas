exports.seed = async function (knex) {
  const [user] = await knex("users").select("id").where({ email: "user@example.com" }).limit(1);
  const [admin] = await knex("users").select("id").where({ email: "admin@example.com" }).limit(1);

  if (!user) {
    throw new Error("User seed requires an existing user with email user@example.com");
  }

  const [claim] = await knex("claims")
    .insert({
      claim_number: "CLM-0001",
      user_id: user.id,
      status: "submitted",
      title: "Satellite imagery damage assessment",
      description: "Initial submission for deforestation claim in Zone 4",
      metadata: {
        latitude: 45.4215,
        longitude: -75.6972,
        severity: "high",
      },
      documents: [],
    })
    .returning(["id"]);

  if (claim && admin) {
    await knex("claim_status_history").insert([
      {
        claim_id: claim.id,
        status: "submitted",
        notes: "Claim submitted via portal",
        changed_by: user.id,
      },
      {
        claim_id: claim.id,
        status: "review",
        notes: "Admin initiated review",
        changed_by: admin.id,
      },
    ]);
  }
};
