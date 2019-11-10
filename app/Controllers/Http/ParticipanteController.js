'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Participante = use('App/Models/Participante')

class ParticipanteController {
  async index () {
    const participantes = await Participante.all()

    return participantes
  }

  async store ({ request }) {
    const data = request.only([
      "user_id",
      "bolao_id",
      "pontosganhos",
      "placarexato",
      "placarvencedor"
    ])

    const participante = await Participante.create(data)

    return participante
  }

  async show ({ params }) {
    const participante = await Participante.findOrFail(params.id)

    return participante
  }

  async update ({ params, request }) {
    const participante = await Participante.findOrFail(params.id)

    participante.user_id = request.input('user_id', participante.user_id)
    participante.bolao_id = request.input('bolao_id', participante.bolao_id)
    participante.pontosganhos = request.input('pontosganhos', participante.pontosganhos)
    participante.placarexato = request.input('placarexato', participante.placarexato)
    participante.placarvencedor = request.input('placarvencedor', participante.placarvencedor)
    await participante.save()

    return participante
  }

  async destroy ({ params }) {
    const participante = await Participante.findOrFail(params.id)

    return participante.delete()
  }
}

module.exports = ParticipanteController
