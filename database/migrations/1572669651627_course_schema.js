'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.string('name')
      table.string('code')
      table.integer('psp_id').unsigned().references('id').inTable('psp')
      table.increments()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CourseSchema
