'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.string('attachment_url');
      table.enu('status', ['aguardando triagem', 'em triagem', 'atribuído', 'em andamento', 'finalizado']).defaultTo('aguardando triagem').notNullable();
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
