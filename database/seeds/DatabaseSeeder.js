'use strict';

const UserSeeder = require('./UserSeeder')
const RoleSeeder = require('./RoleSeeder')
const PermissionSeeder = require('./PermissionSeeder');
const RolePermissionSeeder = require('./RolePermissionSeeder');
const PspSeeder = require('./PspSeeder');


class DatabaseSeeder {
  async run() {
    // Put yours seeders in the desired order
    await RoleSeeder.run()
    await PermissionSeeder.run();
    await RolePermissionSeeder.run();
    await UserSeeder.run();
    await PspSeeder.run();
  }
}

module.exports = DatabaseSeeder
