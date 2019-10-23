'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddsFkToProjectSchema extends Schema {
  up () {
    this.table('projects', (table) => {
      table.integer('project_category_id').unsigned().index();
      table.foreign('project_category_id').references('id').inTable('project_categories').onDelete('cascade')
    })
  }

  down () {
    this.table('projects', (table) => {
      table.dropColumn('project_category_id');
    })
  }
}

module.exports = AddsFkToProjectSchema
