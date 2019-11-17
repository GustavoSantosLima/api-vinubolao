'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const DB = use('Database')
const Pool = use('App/Models/Pool')

class PoolController {
  async index() {
    const pools = await Pool.query()
      .with('user')
      .with('championship')
      .paginate(1, 10)

    return pools
  }

  async ranking({ params }) {
    const data = await DB.raw(`
    SELECT u.name,
      SUM(
        CASE
          WHEN (j.home_score = p.home_guess) AND (j.visitor_score = p.visitor_guess) THEN 1
          WHEN (j.home_score - j.visitor_score = 0) AND (p.home_guess - p.visitor_guess = 0) THEN 0
          WHEN (j.home_score - j.visitor_score > 0) AND (p.home_guess - p.visitor_guess > 0) THEN 0
          WHEN (j.home_score - j.visitor_score < 0) AND (p.home_guess - p.visitor_guess < 0) THEN 0
          ELSE 0
        END
      ) AS exactscores,
      SUM(
        CASE
          WHEN (j.home_score = p.home_guess) AND (j.visitor_score = p.visitor_guess) THEN 0
          WHEN (j.home_score - j.visitor_score = 0) AND (p.home_guess - p.visitor_guess = 0) THEN 1
          WHEN (j.home_score - j.visitor_score > 0) AND (p.home_guess - p.visitor_guess > 0) THEN 1
          WHEN (j.home_score - j.visitor_score < 0) AND (p.home_guess - p.visitor_guess < 0) THEN 1
          ELSE 0
        END
      ) AS winningscores,
      SUM(
      CASE
        WHEN (j.round >= b.double_round) THEN
          CASE
            WHEN (j.home_score = p.home_guess) AND (j.visitor_score = p.visitor_guess) THEN b.exact_score * 2
            WHEN (j.home_score - j.visitor_score = 0) AND (p.home_guess - p.visitor_guess = 0) THEN b.winning_score * 2
            WHEN (j.home_score - j.visitor_score > 0) AND (p.home_guess - p.visitor_guess > 0) THEN b.winning_score * 2
            WHEN (j.home_score - j.visitor_score < 0) AND (p.home_guess - p.visitor_guess < 0) THEN b.winning_score * 2
            ELSE 0
          END
        ELSE
          CASE
            WHEN (j.home_score = p.home_guess) AND (j.visitor_score = p.visitor_guess) THEN b.exact_score
            WHEN (j.home_score - j.visitor_score = 0) AND (p.home_guess - p.visitor_guess = 0) THEN b.winning_score
            WHEN (j.home_score - j.visitor_score > 0) AND (p.home_guess - p.visitor_guess > 0) THEN b.winning_score
            WHEN (j.home_score - j.visitor_score < 0) AND (p.home_guess - p.visitor_guess < 0) THEN b.winning_score
            ELSE 0
          END
        END
      ) AS points
    FROM guesses AS p
    JOIN matches AS j ON j.id = p.match_id
    JOIN users AS u ON u.id = p.user_id
    JOIN pools AS b ON b.id = j.pool_id
    WHERE b.active = 1
    AND b.championship_id = ${params.id}
    ${params.round ? `AND j.round = ${params.round}` : ''}
    GROUP BY u.name
    ORDER BY points DESC, exactscores DESC, winningscores DESC, name`)

    return data[0]
  }

  async store({ request }) {
    const data = request.only([
      'user_id',
      'championship_id',
      'name',
      'description',
      'exact_score',
      'winning_score',
      'double_round',
      'active',
      'starts'
    ])

    const pool = await Pool.create(data)

    return pool
  }

  async show({ params }) {
    const pool = await Pool.query()
      .with('user')
      .with('championship')
      .where('id', params.id)
      .firstOrFail()

    return pool
  }

  async update({ params, request }) {
    const pool = await Pool.findOrFail(params.id)

    pool.user_id = request.input('user_id', pool.user_id)
    pool.championship_id = request.input(
      'championship_id',
      pool.championship_id
    )
    pool.name = request.input('name', pool.name)
    pool.description = request.input('descricao', pool.descricao)
    pool.exact_score = request.input('exact_score', pool.exact_score)
    pool.winning_score = request.input('winning_score', pool.winning_score)
    pool.double_round = request.input('double_round', pool.double_round)
    pool.active = request.input('active', pool.active)
    pool.starts = request.input('starts', pool.starts)
    await pool.save()

    return pool
  }

  async destroy({ params }) {
    const pool = await Pool.findOrFail(params.id)

    return pool.delete()
  }
}

module.exports = PoolController
