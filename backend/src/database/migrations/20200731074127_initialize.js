
exports.up = function(knex) {
    return knex.schema.createTable('tones', function(table) {
        table.increments()
        table.string('name').notNullable()
        table.decimal('value').notNullable()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('tones')
};
