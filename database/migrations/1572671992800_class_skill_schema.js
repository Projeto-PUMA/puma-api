'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassSkillSchema extends Schema {
  up () {
    this.create('class_skill', (table) => {
      table.increments()
      table.integer('skill_id').unsigned().index()
      table.foreign('skill_id').references('id').on('students').onDelete('set null')
      table.integer('class_id').unsigned().index()
      table.foreign('class_id').references('id').on('students').onDelete('set null')
      table.integer('weight')
      table.timestamps(true, true) 
    })
  }

  down () {
    this.drop('class_skill')
  }
}

module.exports = ClassSkillSchema
