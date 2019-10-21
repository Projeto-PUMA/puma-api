'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
    users() {
        return this.belongsToMany('App/Models/Company')
    }
    projects() {
        return this.hasMany('App/Models/Project')
    }
}

module.exports = Company
