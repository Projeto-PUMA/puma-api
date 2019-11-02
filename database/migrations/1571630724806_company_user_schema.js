'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyUserSchema extends Schema {
  up () {
    this.create('companies_users', (table) => {
      table.integer('company_id').unsigned().index()
      table.foreign('company_id').references('id').on('companies').onDelete('cascade')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('companies_users')
  }
}

module.exports = CompanyUserSchema
