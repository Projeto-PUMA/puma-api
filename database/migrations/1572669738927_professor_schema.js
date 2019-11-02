'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessorSchema extends Schema {
  up () {
    this.create('professors', (table) => {
      table.increments()
      table.integer('course_id').unsigned().index()
      table.foreign('course_id').references('id').on('courses').onDelete('set null')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('set null')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('professors')
  }
}

module.exports = ProfessorSchema
