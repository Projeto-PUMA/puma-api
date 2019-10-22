'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    owner(){
        return this.belongsTo('App/Models/User')
    }
    company(){
        return this.belongsTo('App/Models/Company')
    }
    projectCategory(){
        return this.belongsTo('App/Models/ProjectCategory')
    }
}

module.exports = Project
