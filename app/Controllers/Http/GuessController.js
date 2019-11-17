'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Guess = use('App/Models/Guess')

class GuessController {
  async index() {
    const guesses = await Guess.query()
      .with('match', builder => {
        builder.with('home').with('visitor')
      })
      .with('user')
      .paginate(1, 10)

    return guesses
  }

  async store({ request }) {
    const data = request.only([
      'match_id',
      'user_id',
      'guess_home',
      'guess_visitor'
    ])

    const guess = await Guess.create(data)

    return guess
  }

  async show({ params }) {
    const guess = await Guess.query()
      .with('match', builder => {
        builder.with('home').with('visitor')
      })
      .with('user')
      .where('id', params.id)
      .firstOrFail()

    return guess
  }

  async update({ params, request }) {
    const guess = await Guess.findOrFail(params.id)

    guess.match_id = request.input('match_id', guess.match_id)
    guess.user_id = request.input('user_id', guess.user_id)
    guess.guess_home = request.input('guess_home', guess.guess_home)
    guess.guess_visitor = request.input('guess_visitor', guess.guess_visitor)
    await guess.save()

    return guess
  }

  async destroy({ params }) {
    const guess = await Guess.findOrFail(params.id)

    return guess.delete()
  }
}

module.exports = GuessController
