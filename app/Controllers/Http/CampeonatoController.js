'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Campeonato = use('App/Models/Campeonato')

class CampeonatoController {
  async index () {
    const campeonatos = await Campeonato.all()

    return campeonatos
  }

  async store ({ request }) {
    const data = request.only([
      "nome",
      "nome_completo",
      "qtd_times",
      "qtd_rodadas",
      "rodada",
      "temporada",
      "serie",
      "estado",
      "pais",
      "inicio",
      "termino"
    ])

    const campeonato = await Campeonato.create(data)

    return campeonato
  }

  async show ({ params }) {
    const campeonato = await Campeonato.findOrFail(params.id)

    return campeonato
  }

  async update ({ params, request }) {
    const campeonato = await Campeonato.findOrFail(params.id)

    campeonato.nome = request.input('nome', campeonato.nome)
    campeonato.nome_completo = request.input('nome_completo', campeonato.nome_completo)
    campeonato.qtd_times = request.input('qtd_times', campeonato.qtd_times)
    campeonato.qtd_rodadas = request.input('qtd_rodadas', campeonato.qtd_rodadas)
    campeonato.rodada = request.input('rodada', campeonato.rodada)
    campeonato.temporada = request.input('temporada', campeonato.temporada)
    campeonato.serie = request.input('serie', campeonato.serie)
    campeonato.estado = request.input('estado', campeonato.estado)
    campeonato.pais = request.input('pais', campeonato.pais)
    campeonato.inicio = request.input('inicio', campeonato.inicio)
    campeonato.termino = request.input('termino', campeonato.termino)
    await campeonato.save()

    return campeonato
  }

  async destroy ({ params }) {
    const campeonato = await Campeonato.findOrFail(params.id)

    return campeonato.delete()
  }
}

module.exports = CampeonatoController
