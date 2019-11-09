'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampeonatosSchema extends Schema {
  up () {
    this.create('campeonatos', (table) => {
      table.increments()
      table.string('nome', 50).notNullable()
      table.string('nome_completo', 50).notNullable()
      table.integer('qtd_times').notNullable()
      table.integer('qtd_rodadas').notNullable()
      table.integer('rodada').nullable()
      table.integer('temporada').notNullable()
      table.string('serie', 1).notNullable()
      table.string('estado', 2).nullable()
      table.string('pais', 50).notNullable()
      table.date('inicio').notNullable()
      table.date('termino').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('campeonatos')
  }
}

module.exports = CampeonatosSchema
