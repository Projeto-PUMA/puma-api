/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');

class RoleSeeder {
  static async run() {
    await Database.table('roles').insert([
      {
        name: 'admin',
        slug: 'admin',
        description: 'the admin',
      },
      {
        name: 'coordenador',
        slug: 'coordenador',
        description: 'the coordenador',
      },
      {
        name: 'user',
        slug: 'user',
        description: 'the user',
      },
      {
        name: 'professor',
        slug: 'professor',
        description: 'the professor',
      },
      {
        name: 'monitor',
        slug: 'monitor',
        description: 'the monitor',
      },
      {
        name: 'project owner',
        slug: 'project_owner',
        description: 'the project owner',
      },
    ]);
  }
}

module.exports = RoleSeeder;
