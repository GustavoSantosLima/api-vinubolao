'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamsSchema extends Schema {
  up() {
    this.create('teams', table => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('full_name', 50).notNullable()
      table.string('initials', 3).notNullable()
      table.string('stadium', 70).nullable()
      table.string('state', 2).nullable()
      table.string('country', 50).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('teams')
  }
}

module.exports = TeamsSchema
