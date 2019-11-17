'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchesSchema extends Schema {
  up() {
    this.create('matches', table => {
      table.increments()
      table
        .integer('championship_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('championships')
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
      table.integer('round').notNullable()
      table.date('match_time').notNullable()
      table
        .integer('home_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('teams')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('home_score').nullable()
      table.integer('visitor_score').nullable()
      table
        .integer('visitor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('teams')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('matches')
  }
}

module.exports = MatchesSchema
