/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReportSchema extends Schema {
  up() {
    this.create('reports', table => {
      table.increments();
      table
        .integer('team_id')
        .unsigned()
        .index();
      table
        .foreign('team_id')
        .references('id')
        .on('courses')
        .onDelete('set null');
      table.string('url');
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('reports');
  }
}

module.exports = ReportSchema;
