'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.post('/authenticate', 'AuthController.authenticate')

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()
  Route.resource('times', 'TimeController').apiOnly()
  Route.resource('jogos', 'JogoController').apiOnly()
  Route.resource('bolaos', 'BolaoController').apiOnly()
  Route.resource('palpites', 'PalpiteController').apiOnly()
  Route.resource('campeonatos', 'CampeonatoController').apiOnly()
  Route.resource('participantes', 'ParticipanteController').apiOnly()

  Route.get('classificacao/:id/:rodada?', 'BolaoController.classificacao')
}).middleware('auth')
