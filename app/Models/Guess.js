'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Guess extends Model {
  match() {
    return this.belongsTo('App/Models/Match')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Guess
