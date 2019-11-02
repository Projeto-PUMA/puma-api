'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GradeSchema extends Schema {
  up () {
    this.create('grades', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('grades')
  }
}

module.exports = GradeSchema
