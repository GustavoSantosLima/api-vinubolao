'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChampionshipsSchema extends Schema {
  up() {
    this.create('championships', table => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('full_name', 50).notNullable()
      table.integer('number_teams').notNullable()
      table.integer('number_rounds').notNullable()
      table.integer('round').nullable()
      table.integer('season').notNullable()
      table.string('serie', 1).notNullable()
      table.string('state', 2).nullable()
      table.string('country', 50).notNullable()
      table.date('starts').notNullable()
      table.date('ends').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('championships')
  }
}

module.exports = ChampionshipsSchema
