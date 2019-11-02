'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SkillSchema extends Schema {
  up () {
    this.create('skills', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.enu('category', ['soft', 'hard']).defaultTo('soft').notNullable();
      table.integer('skill_id').unsigned().index();
      table.foreign('skill_id').references('id').inTable('skills');
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('skills')
  }
}

module.exports = SkillSchema
