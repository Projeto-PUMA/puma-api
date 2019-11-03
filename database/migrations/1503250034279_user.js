/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table
        .string('username', 80)
        .notNullable()
        .unique();
      table.string('name', 254).notNullable();
      table
        .string('email', 254)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
      table
        .enu('education_level', [
          'superior completo',
          'superior incompleto',
          'medio completo',
          'medio incompleto',
          'fundamental completo',
          'fundamental incompleto',
        ])
        .notNullable(),
        table.string('profession').notNullable();
      table.boolean('account_status').defaultTo(false);
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
