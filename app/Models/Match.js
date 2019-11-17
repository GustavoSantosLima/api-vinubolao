'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Match extends Model {
  championship() {
    return this.belongsTo('App/Models/Championship')
  }

  pool() {
    return this.belongsTo('App/Models/Pool')
  }

  home() {
    return this.belongsTo('App/Models/Team', 'home_id', 'id')
  }

  visitor() {
    return this.belongsTo('App/Models/Team', 'visitor_id', 'id')
  }
}

module.exports = Match
