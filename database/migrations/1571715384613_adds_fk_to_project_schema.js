/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddsFkToProjectSchema extends Schema {
  up() {
    this.table('projects', table => {
      table
        .integer('psp_id')
        .unsigned()
        .index();
      table
        .foreign('psp_id')
        .references('id')
        .inTable('psps')
        .onDelete('cascade');
    });
  }

  down() {
    this.table('projects', table => {
      table.dropColumn('psp_id');
    });
  }
}

module.exports = AddsFkToProjectSchema;
