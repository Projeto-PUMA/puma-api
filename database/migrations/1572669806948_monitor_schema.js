'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MonitorSchema extends Schema {
  up () {
    this.create('monitors', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('monitors')
  }
}

module.exports = MonitorSchema
