'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pool extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  championship() {
    return this.belongsTo('App/Models/Championship')
  }
}

module.exports = Pool
