"use strict";

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')

class PermissionSeeder {
  static async run() {
    const timestamp = new Date();
    await Database.table("permissions").insert([
      {
        name: 'Create Users',
        slug: 'create_users',
        description: 'create_users',
      },
      {
        name: 'Update Users',
        slug: 'update_users',
        description: 'update_users',
      },
      {
        name: 'Delete Users',
        slug: 'delete_users',
        description: 'delete_users',
      },
      {
        name: 'Read Users',
        slug: 'read_users',
        description: 'read_users',
      },
      {
        name: 'Create projects',
        slug: 'create_projects',
        description: 'create_projects',
      },
      {
        name: 'Update projects',
        slug: 'update_projects',
        description: 'update_projects',
      },
      {
        name: 'Delete projects',
        slug: 'delete_projects',
        description: 'delete_projects',
      },
      {
        name: 'Read projects',
        slug: 'read_projects',
        description: 'read_projects',
      },
      {
        name: 'Create company',
        slug: 'create_company',
        description: 'create_company',
      },
      {
        name: 'Update company',
        slug: 'update_company',
        description: 'update_company',
      },
      {
        name: 'Delete company',
        slug: 'delete_company',
        description: 'delete_company',
      },
      {
        name: 'Read company',
        slug: 'read_company',
        description: 'read_company',
      },
      {
        name: 'Create news',
        slug: 'create_news',
        description: 'create_news',
      },
      {
        name: 'Update news',
        slug: 'update_news',
        description: 'update_news',
      },
      {
        name: 'Delete news',
        slug: 'delete_news',
        description: 'delete_news',
      },
      {
        name: 'Read news',
        slug: 'read_news',
        description: 'read_news',
      },
      {
        name: 'Create psp',
        slug: 'create_psp',
        description: 'create_psp',
      },
      {
        name: 'Update psp',
        slug: 'update_psp',
        description: 'update_psp',
      },
      {
        name: 'Delete psp',
        slug: 'delete_psp',
        description: 'delete_psp',
      },
      {
        name: 'Read psp',
        slug: 'read_psp',
        description: 'read_psp',
      }
    ]);
  }
}

module.exports = PermissionSeeder;
