'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Palpite extends Model {
  jogo () {
    return this.belongsTo('App/Models/Jogo')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Palpite
