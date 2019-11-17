'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Match = use('App/Models/Match')

class MatchController {
  async index() {
    const matches = await Match.query()
      .with('pool')
      .with('championship')
      .with('home')
      .with('visitor')
      .paginate(1, 10)

    return matches
  }

  async getByChampionship({ params }) {
    const matches = await Match.query()
      .with('championship')
      .with('home')
      .with('visitor')
      .where({ championship_id: params.id, round: params.round })
      .fetch()

    return matches
  }

  async store({ request }) {
    const data = request.only([
      'championship_id',
      'pool_id',
      'round',
      'match_time',
      'home_id',
      'home_score',
      'visitor_score',
      'visitor_id'
    ])

    const match = await Match.create(data)

    return match
  }

  async show({ params }) {
    const match = await Match.query()
      .with('pool')
      .with('championship')
      .with('home')
      .with('visitor')
      .where('id', params.id)
      .firstOrFail()

    return match
  }

  async update({ params, request }) {
    const match = await Match.findOrFail(params.id)

    match.championship_id = request.input(
      'championship_id',
      match.championship_id
    )
    match.pool_id = request.input('pool_id', match.pool_id)
    match.round = request.input('round', match.round)
    match.match_time = request.input('match_time', match.match_time)
    match.home_id = request.input('home_id', match.home_id)
    match.home_score = request.input('home_score', match.home_score)
    match.visitor_score = request.input('visitor_score', match.visitor_score)
    match.visitor_id = request.input('visitor_id', match.visitor_id)
    await match.save()

    return match
  }

  async destroy({ params }) {
    const match = await Match.findOrFail(params.id)

    return match.delete()
  }
}

module.exports = MatchController
