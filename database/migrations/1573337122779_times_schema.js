'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimesSchema extends Schema {
  up () {
    this.create('times', (table) => {
      table.increments()
      table.string('nome', 50).notNullable()
      table.string('nome_completo', 50).notNullable()
      table.string('sigla', 3).notNullable()
      table.string('estadio', 70).nullable()
      table.string('estado', 2).nullable()
      table.string('pais', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('times')
  }
}

module.exports = TimesSchema
