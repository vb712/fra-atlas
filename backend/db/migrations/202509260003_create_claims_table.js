exports.up = async function (knex) {
  await knex.schema.createTable("claims", (table) => {
    table.increments("id").primary();
    table.string("claim_number", 64).notNullable().unique();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("status", 50).notNullable().defaultTo("submitted");
    table.string("title", 150).notNullable();
    table.text("description");
    table
      .jsonb("metadata")
      .notNullable()
      .defaultTo(knex.raw("'{}'::jsonb"));
    table
      .jsonb("documents")
      .notNullable()
      .defaultTo(knex.raw("'[]'::jsonb"));
    table.timestamp("submitted_at").defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("claims");
};
