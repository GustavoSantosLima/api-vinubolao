'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PoolsSchema extends Schema {
  up() {
    this.create('pools', table => {
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
        .integer('championship_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('championships')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 50).notNullable()
      table.text('description', 50).nullable()
      table.integer('exact_score').nullable()
      table.integer('winning_score').nullable()
      table.integer('double_round').nullable()
      table
        .boolean('active')
        .notNullable()
        .default(0)
      table.date('starts').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('pools')
  }
}

module.exports = PoolsSchema
