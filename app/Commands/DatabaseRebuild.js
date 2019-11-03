/* eslint-disable import/no-extraneous-dependencies */
const { Command } = require('@adonisjs/ace');
const shell = require('shelljs');

class DatabaseRebuild extends Command {
  static get signature() {
    return 'database:rebuild';
  }

  static get description() {
    return 'Tell something helpful about this command';
  }

  async handle() {
    this.info('Rebuilding...');
    // eslint-disable-next-line no-unused-expressions
    shell.exec(
      `NODE_ENV='development' adonis migration:reset &&\
    NODE_ENV='development' adonis migration:run &&\
    NODE_ENV='development' adonis seed --files DatabaseSeeder.js `,
      { silent: true }
    ).output;
    this.info(`${this.icon('success')} Completed`);
  }
}

module.exports = DatabaseRebuild;
