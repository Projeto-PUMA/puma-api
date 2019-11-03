/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClassSchema extends Schema {
  up() {
    this.create('classes', table => {
      table.string('name');
      table.date('starts_at');
      table.date('finishes_at');
      table
        .integer('professor_id')
        .unsigned()
        .index();
      table
        .foreign('professor_id')
        .references('id')
        .on('professors')
        .onDelete('set null');
      table.increments();
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('classes');
  }
}

module.exports = ClassSchema;
