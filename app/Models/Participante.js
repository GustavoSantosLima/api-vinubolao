'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Participante extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  bolao () {
    return this.belongsTo('App/Models/Bolao')
  }
}

module.exports = Participante
