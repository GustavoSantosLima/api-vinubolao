'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Palpite = use('App/Models/Palpite')

class PalpiteController {
  async index() {
    const palpites = await Palpite.query()
      .with('jogo', builder => {
        builder.with('mandante').with('visitante')
      })
      .with('user')
      .paginate(1, 10)

    return palpites
  }

  async store({ request }) {
    const data = request.only([
      'jogo_id',
      'user_id',
      'palpite_casa',
      'palpite_fora',
      'horario'
    ])

    const palpite = await Palpite.create(data)

    return palpite
  }

  async show({ params }) {
    const palpite = await Palpite.query()
      .with('jogo', builder => {
        builder.with('mandante').with('visitante')
      })
      .with('user')
      .where('id', params.id)
      .firstOrFail()

    return palpite
  }

  async update({ params, request }) {
    const palpite = await Palpite.findOrFail(params.id)

    palpite.jogo_id = request.input('jogo_id', palpite.jogo_id)
    palpite.user_id = request.input('user_id', palpite.user_id)
    palpite.palpite_casa = request.input('palpite_casa', palpite.palpite_casa)
    palpite.palpite_fora = request.input('palpite_fora', palpite.palpite_fora)
    palpite.horario = request.input('horario', palpite.horario)
    await palpite.save()

    return palpite
  }

  async destroy({ params }) {
    const palpite = await Palpite.findOrFail(params.id)

    return palpite.delete()
  }
}

module.exports = PalpiteController
