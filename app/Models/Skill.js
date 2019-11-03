/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Skill extends Model {
  children() {
    return this.hasMany('App/Models/Skill');
  }

  father() {
    return this.belongsTo('App/Models/Skill');
  }
}

module.exports = Skill;
