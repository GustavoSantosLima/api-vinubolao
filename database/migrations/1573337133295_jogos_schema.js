'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JogosSchema extends Schema {
  up() {
    this.create('jogos', table => {
      table.increments()
      table
        .integer('campeonato_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('campeonatos')
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
      table.integer('rodada').notNullable()
      table.date('inicio').notNullable()
      table
        .integer('timecasa_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('times')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('placar_casa').nullable()
      table.integer('placar_fora').nullable()
      table
        .integer('timefora_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('times')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('jogos')
  }
}

module.exports = JogosSchema
