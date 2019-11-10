'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Model = use('Model')

class Campeonato extends Model {
  static get table () {
    return 'campeonatos'
  }
}

module.exports = Campeonato