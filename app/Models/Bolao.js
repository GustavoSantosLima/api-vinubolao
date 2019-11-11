'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bolao extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  campeonato() {
    return this.belongsTo('App/Models/Campeonato')
  }
}

module.exports = Bolao
