'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Psp extends Model {
    children(){
        return this.hasMany('App/Models/Psp')
    }
    father(){
        return this.belongsTo('App/Models/Psp')
    }
    projects(){
        return this.belongsToMany('App/Models/Project')
    }
}

module.exports = Psp
