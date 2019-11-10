'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Jogo extends Model {
  campeonato () {
    return this.belongsTo('App/Models/Campeonato')
  }

  bolao () {
    return this.belongsTo('App/Models/Bolao')
  }

  mandante () {
    return this.belongsTo('App/Models/Time', 'timecasa_id', 'id')
  }

  visitante () {
    return this.belongsTo('App/Models/Time', 'timefora_id', 'id')
  }
}

module.exports = Jogo
