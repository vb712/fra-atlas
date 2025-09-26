exports.up = async function (knex) {
  await knex.schema.createTable("claim_status_history", (table) => {
    table.increments("id").primary();
    table
      .integer("claim_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("claims")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("status", 50).notNullable();
    table.text("notes");
    table
      .integer("changed_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("claim_status_history");
};
