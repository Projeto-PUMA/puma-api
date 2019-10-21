'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectCategorySchema extends Schema {
  up () {
    this.create('project_categories', (table) => {
      table.increments()
      table.string('title')
      table.string('description')
      table.integer('project_category_id').unsigned().index();
      table.foreign('project_category_id').references('id').inTable('project_category');
      table.timestamps()
    })
  }

  down () {
    this.drop('project_categories')
  }
}

module.exports = ProjectCategorySchema
