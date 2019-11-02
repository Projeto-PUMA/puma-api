'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.integer('class_id').unsigned().index()
      table.foreign('class_id').references('id').on('classes').onDelete('set null')
      table.integer('project_id').unsigned().index()
      table.foreign('project_id').references('id').on('projects').onDelete('set null')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamSchema
