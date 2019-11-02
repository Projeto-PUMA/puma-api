'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.integer('team_id').unsigned().index()
      table.foreign('team_id').references('id').on('teams').onDelete('set null')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('set null')
      table.float('final_grade', 3)
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema
