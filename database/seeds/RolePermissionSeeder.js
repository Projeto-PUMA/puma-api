"use strict";

/*
|--------------------------------------------------------------------------
| RolePermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')

class RolePermissionSeeder {
  static async run() {
    await Database.table("roles_permissions").insert([
      {
        permission_id: 1,
        role_id: 1
      },
    ]);
  }
}

module.exports = RolePermissionSeeder;
