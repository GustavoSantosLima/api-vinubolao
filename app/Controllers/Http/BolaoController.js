'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Bolao = use('App/Models/Bolao')

class BolaoController {
  async index() {
    const boloes = await Bolao.query()
      .with('user')
      .with('campeonato')
      .fetchOrFail()

    return boloes
  }

  async store({ request }) {
    const data = request.only([
      'user_id',
      'campeonato_id',
      'nome',
      'descricao',
      'placar_exato',
      'placar_vencedor',
      'rodada_dobro',
      'ativo',
      'inicio'
    ])

    const bolao = await Bolao.create(data)

    return bolao
  }

  async show({ params }) {
    const bolao = await Bolao.query()
      .with('user')
      .with('campeonato')
      .where('id', params.id)
      .firstOrFail()

    return bolao
  }

  async update({ params, request }) {
    const bolao = await Bolao.findOrFail(params.id)

    bolao.user_id = request.input('user_id', bolao.user_id)
    bolao.campeonato_id = request.input('campeonato_id', bolao.campeonato_id)
    bolao.nome = request.input('nome', bolao.nome)
    bolao.descricao = request.input('descricao', bolao.descricao)
    bolao.placar_exato = request.input('placar_exato', bolao.placar_exato)
    bolao.placar_vencedor = request.input(
      'placar_vencedor',
      bolao.placar_vencedor
    )
    bolao.rodada_dobro = request.input('rodada_dobro', bolao.rodada_dobro)
    bolao.ativo = request.input('ativo', bolao.ativo)
    bolao.inicio = request.input('inicio', bolao.inicio)
    await bolao.save()

    return bolao
  }

  async destroy({ params }) {
    const bolao = await Bolao.findOrFail(params.id)

    return bolao.delete()
  }
}

module.exports = BolaoController
