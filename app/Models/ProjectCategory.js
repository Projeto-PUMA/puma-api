'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProjectCategory extends Model {
    children(){
        return this.hasMany('App/Models/ProjectCategory')
    }
    father(){
        return this.belongsTo('App/Models/ProjectCategory')
    }
    projects(){
        return this.belongsToMany('App/Models/Project')
    }
}

module.exports = ProjectCategory
