'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParticipantesSchema extends Schema {
  up() {
    this.create('participantes', table => {
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
        .integer('bolao_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('bolaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('pontosganhos')
        .nullable()
        .default(0)
      table
        .integer('placarexato')
        .nullable()
        .default(0)
      table
        .integer('placarvencedor')
        .nullable()
        .default(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('participantes')
  }
}

module.exports = ParticipantesSchema
