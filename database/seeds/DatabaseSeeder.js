'use strict';

const UserSeeder = require('./UserSeeder')
const RoleSeeder = require('./RoleSeeder')
const PermissionSeeder = require('./PermissionSeeder');

class DatabaseSeeder {
  async run() {
    // Put yours seeders in the desired order
    await RoleSeeder.run()
    await PermissionSeeder.run();
    await UserSeeder.run();
  }
}

module.exports = DatabaseSeeder
