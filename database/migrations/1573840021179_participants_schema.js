'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParticipantsSchema extends Schema {
  up() {
    this.create('participants', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('pool_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('pools')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('points')
        .nullable()
        .default(0)
      table
        .integer('exactscores')
        .nullable()
        .default(0)
      table
        .integer('winningscores')
        .nullable()
        .default(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('participants')
  }
}

module.exports = ParticipantsSchema
