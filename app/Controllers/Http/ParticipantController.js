'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Participant = use('App/Models/Participant')

class ParticipantController {
  async index() {
    const participants = await Participant.query()
      .with('user')
      .with('pool')
      .paginate(1, 10)

    return participants
  }

  async store({ request }) {
    const data = request.only([
      'user_id',
      'pool_id',
      'points',
      'exactscores',
      'winningscores'
    ])

    const participant = await Participant.create(data)

    return participant
  }

  async show({ params }) {
    const participant = await Participant.query()
      .with('user')
      .with('pool')
      .where('id', params.id)
      .firstOrFail()

    return participant
  }

  async update({ params, request }) {
    const participant = await Participant.findOrFail(params.id)

    participant.user_id = request.input('user_id', participant.user_id)
    participant.pool_id = request.input('pool_id', participant.pool_id)
    participant.points = request.input('points', participant.points)
    participant.exactscores = request.input(
      'exactscores',
      participant.exactscores
    )
    participant.winningscores = request.input(
      'winningscores',
      participant.winningscores
    )
    await participant.save()

    return participant
  }

  async destroy({ params }) {
    const participant = await Participant.findOrFail(params.id)

    return participant.delete()
  }
}

module.exports = ParticipantController
