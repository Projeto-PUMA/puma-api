'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PspSchema extends Schema {
  up () {
    this.create('psps', (table) => {
      table.increments()
      table.string('title')
      table.string('description')
      table.integer('psp_id').unsigned().index();
      table.foreign('psp_id').references('id').inTable('psps');
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('psps')
  }
}

module.exports = PspSchema
