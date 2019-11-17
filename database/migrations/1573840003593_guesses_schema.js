'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuessesSchema extends Schema {
  up() {
    this.create('guesses', table => {
      table.increments()
      table
        .integer('match_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('matches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('home_guess').nullable()
      table.integer('visitor_guess').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('guesses')
  }
}

module.exports = GuessesSchema
