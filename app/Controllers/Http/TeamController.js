'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Team = use('App/Models/Team')

class TeamController {
  async index() {
    const teams = await Team.all()

    return teams
  }

  async store({ request }) {
    const data = request.only([
      'name',
      'full_name',
      'initials',
      'stadium',
      'state',
      'country'
    ])

    const team = await Team.create(data)

    return team
  }

  async show({ params }) {
    const team = await Team.findOrFail(params.id)

    return team
  }

  async update({ params, request }) {
    const team = await Team.findOrFail(params.id)

    team.name = request.input('name', team.name)
    team.full_name = request.input('full_name', team.full_name)
    team.initials = request.input('initials', team.initials)
    team.stadium = request.input('stadium', team.stadium)
    team.state = request.input('state', team.state)
    team.country = request.input('country', team.country)
    await team.save()

    return team
  }

  async destroy({ params }) {
    const team = await Team.findOrFail(params.id)

    return team.delete()
  }
}

module.exports = TeamController
