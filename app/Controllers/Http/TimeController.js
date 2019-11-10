'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Time = use('App/Models/Time')

class TimeController {
  async index () {
    const times = await Time.all()

    return times
  }

  async store ({ request }) {
    const data = request.only(["nome", "nome_completo", "sigla", "estadio", "estado", "pais"])

    const time = await Time.create(data)

    return time
  }

  async show ({ params }) {
    const time = await Time.findOrFail(params.id)

    return time
  }

  async update ({ params, request }) {
    const time = await Time.findOrFail(params.id)

    time.nome = request.input('nome', time.nome)
    time.nome_completo = request.input('nome_completo', time.nome_completo)
    time.sigla = request.input('sigla', time.sigla)
    time.estadio = request.input('estadio', time.estadio)
    time.estado = request.input('estado', time.estado)
    time.pais = request.input('pais', time.pais)
    await time.save()

    return time
  }

  async destroy ({ params }) {
    const time = await Time.findOrFail(params.id)

    return time.delete()
  }
}

module.exports = TimeController
