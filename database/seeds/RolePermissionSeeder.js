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
    const allPermissions = await Database.select('*').from('permissions');
    const admin = await Database.select('*').from('roles').where('slug', 'admin').first();
    const adminPermissions = allPermissions.map(permission => {
      return {role_id: admin.id, permission_id: permission.id}
    })
    await Database.table("roles_permissions").insert(adminPermissions);
  }
}

module.exports = RolePermissionSeeder;
