'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BolaosSchema extends Schema {
  up() {
    this.create('bolaos', table => {
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
        .integer('campeonato_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('campeonatos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('nome', 50).notNullable()
      table.text('descricao', 50).nullable()
      table.integer('placar_exato').nullable()
      table.integer('placar_vencedor').nullable()
      table.integer('rodada_dobro').nullable()
      table
        .boolean('ativo')
        .notNullable()
        .default(0)
      table.date('inicio').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('bolaos')
  }
}

module.exports = BolaosSchema
