/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReviewSchema extends Schema {
  up() {
    this.create('reviews', table => {
      table.increments();
      table
        .integer('reviewer_id')
        .unsigned()
        .index();
      table
        .foreign('reviewer_id')
        .references('id')
        .on('students')
        .onDelete('set null');
      table
        .integer('reviewed_id')
        .unsigned()
        .index();
      table
        .foreign('reviewed_id')
        .references('id')
        .on('students')
        .onDelete('set null');
      table.float('grade', 3);
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('reviews');
  }
}

module.exports = ReviewSchema;
