'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const DB = use('Database')
const Bolao = use('App/Models/Bolao')

class BolaoController {
  async index() {
    const boloes = await Bolao.query()
      .with('user')
      .with('campeonato')
      .paginate(1, 10)

    return boloes
  }

  async classificacao({ params }) {
    const data = await DB.raw(`
    SELECT u.name,
      SUM(
        CASE
          WHEN (j.placar_casa = p.palpite_casa) AND (j.placar_fora = p.palpite_fora) THEN 1
          WHEN (j.placar_casa - j.placar_fora = 0) AND (p.palpite_casa - p.palpite_fora = 0) THEN 0
          WHEN (j.placar_casa - j.placar_fora > 0) AND (p.palpite_casa - p.palpite_fora > 0) THEN 0
          WHEN (j.placar_casa - j.placar_fora < 0) AND (p.palpite_casa - p.palpite_fora < 0) THEN 0
          ELSE 0
        END
      ) AS placarexato,
      SUM(
        CASE
          WHEN (j.placar_casa = p.palpite_casa) AND (j.placar_fora = p.palpite_fora) THEN 0
          WHEN (j.placar_casa - j.placar_fora = 0) AND (p.palpite_casa - p.palpite_fora = 0) THEN 1
          WHEN (j.placar_casa - j.placar_fora > 0) AND (p.palpite_casa - p.palpite_fora > 0) THEN 1
          WHEN (j.placar_casa - j.placar_fora < 0) AND (p.palpite_casa - p.palpite_fora < 0) THEN 1
          ELSE 0
        END
      ) AS placarvencedor,
      SUM(
      CASE
        WHEN (j.rodada >= b.rodada_dobro) THEN
          CASE
            WHEN (j.placar_casa = p.palpite_casa) AND (j.placar_fora = p.palpite_fora) THEN b.placar_exato * 2
            WHEN (j.placar_casa - j.placar_fora = 0) AND (p.palpite_casa - p.palpite_fora = 0) THEN b.placar_vencedor * 2
            WHEN (j.placar_casa - j.placar_fora > 0) AND (p.palpite_casa - p.palpite_fora > 0) THEN b.placar_vencedor * 2
            WHEN (j.placar_casa - j.placar_fora < 0) AND (p.palpite_casa - p.palpite_fora < 0) THEN b.placar_vencedor * 2
            ELSE 0
          END
        ELSE
          CASE
            WHEN (j.placar_casa = p.palpite_casa) AND (j.placar_fora = p.palpite_fora) THEN b.placar_exato
            WHEN (j.placar_casa - j.placar_fora = 0) AND (p.palpite_casa - p.palpite_fora = 0) THEN b.placar_vencedor
            WHEN (j.placar_casa - j.placar_fora > 0) AND (p.palpite_casa - p.palpite_fora > 0) THEN b.placar_vencedor
            WHEN (j.placar_casa - j.placar_fora < 0) AND (p.palpite_casa - p.palpite_fora < 0) THEN b.placar_vencedor
            ELSE 0
          END
        END
      ) AS pontosganhos
    FROM palpites AS p
    JOIN jogos AS j ON j.id = p.jogo_id
    JOIN users AS u ON u.id = p.user_id
    JOIN bolaos AS b ON b.id = j.bolao_id
    WHERE b.ativo = 1
    AND b.campeonato_id = ${params.id}
    ${params.rodada ? `AND j.rodada = ${params.rodada}` : ''}
    GROUP BY u.name
    ORDER BY pontosganhos DESC, placarexato DESC, placarvencedor DESC, name`)

    return data[0]
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
