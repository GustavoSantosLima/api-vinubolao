'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Championship = use('App/Models/Championship')

class ChampionshipController {
  async index() {
    const championships = await Championship.all()

    return championships
  }

  async store({ request }) {
    const data = request.only([
      'name',
      'full_name',
      'number_teams',
      'number_rounds',
      'round',
      'season',
      'serie',
      'state',
      'country',
      'starts',
      'ends'
    ])

    const championship = await Championship.create(data)

    return championship
  }

  async show({ params }) {
    const championship = await Championship.findOrFail(params.id)

    return championship
  }

  async update({ params, request }) {
    const championship = await Championship.findOrFail(params.id)

    championship.name = request.input('name', championship.name)
    championship.full_name = request.input('full_name', championship.full_name)
    championship.number_teams = request.input(
      'number_teams',
      championship.number_teams
    )
    championship.number_rounds = request.input(
      'number_rounds',
      championship.number_rounds
    )
    championship.round = request.input('round', championship.round)
    championship.season = request.input('season', championship.season)
    championship.serie = request.input('serie', championship.serie)
    championship.state = request.input('state', championship.state)
    championship.country = request.input('country', championship.country)
    championship.starts = request.input('starts', championship.starts)
    championship.ends = request.input('ends', championship.ends)
    await championship.save()

    return championship
  }

  async destroy({ params }) {
    const championship = await Championship.findOrFail(params.id)

    return championship.delete()
  }
}

module.exports = ChampionshipController
