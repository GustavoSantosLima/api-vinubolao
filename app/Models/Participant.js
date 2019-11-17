'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Participant extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  pool() {
    return this.belongsTo('App/Models/Pool')
  }
}

module.exports = Participant
