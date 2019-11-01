'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.text('slug').notNullable();
      table.boolean('is_published').defaultTo(true);
      table.enu('category', ['notícia', 'melhores projetos', 'divulgação de edital']).defaultTo('notícia').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps(true, true)
    })
  }
  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
