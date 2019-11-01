'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('registered_number')
      table.string('legal_name')
      table.string('trade_name')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
