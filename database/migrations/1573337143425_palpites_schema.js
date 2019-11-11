'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PalpitesSchema extends Schema {
  up() {
    this.create('palpites', table => {
      table.increments()
      table
        .integer('jogo_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('jogos')
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
      table.integer('palpite_casa').nullable()
      table.integer('palpite_fora').nullable()
      table.timestamp('horario').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('palpites')
  }
}

module.exports = PalpitesSchema
