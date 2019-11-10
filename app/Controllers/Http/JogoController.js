'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Jogo = use('App/Models/Jogo')

class JogoController {
  async index () {
    const jogos = await Jogo.query().with('bolao')
    .with('campeonato').with('mandante').with('visitante').fetch()

    return jogos
  }

  async store ({ request }) {
    const data = request.only([
      "campeonato_id",
      "bolao_id",
      "rodada",
      "inicio",
      "timecasa_id",
      "placar_casa",
      "placar_fora",
      "timefora_id"
    ])

    const jogo = await Jogo.create(data)

    return jogo
  }

  async show ({ params }) {
    const jogo = await Jogo.query().with('bolao').with('campeonato')
    .with('mandante').with('visitante').where('id', params.id).firstOrFail()

    return jogo
  }

  async update ({ params, request }) {
    const jogo = await Jogo.findOrFail(params.id)

    jogo.campeonato_id = request.input('campeonato_id', jogo.campeonato_id)
    jogo.bolao_id = request.input('bolao_id', jogo.bolao_id)
    jogo.rodada = request.input('rodada', jogo.rodada)
    jogo.inicio = request.input('inicio', jogo.inicio)
    jogo.timecasa_id = request.input('timecasa_id', jogo.timecasa_id)
    jogo.placar_casa = request.input('placar_casa', jogo.placar_casa)
    jogo.placar_fora = request.input('placar_fora', jogo.placar_fora)
    jogo.timefora_id = request.input('timefora_id', jogo.timefora_id)
    await jogo.save()

    return jogo
  }

  async destroy ({ params }) {
    const jogo = await Jogo.findOrFail(params.id)

    return jogo.delete()
  }
}

module.exports = JogoController
