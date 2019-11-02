'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MonitorSchema extends Schema {
  up () {
    this.create('monitors', (table) => {
      table.increments()
      table.integer('class_id').unsigned().index()
      table.foreign('class_id').references('id').on('classes').onDelete('set null')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('set null')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('monitors')
  }
}

module.exports = MonitorSchema
