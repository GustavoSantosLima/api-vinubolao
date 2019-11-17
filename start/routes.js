'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.post('/authenticate', 'AuthController.authenticate')

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()

  Route.resource('teams', 'TeamController').apiOnly()

  Route.resource('matches', 'MatchController').apiOnly()
  Route.get(
    'matches/championship/:id/:round?',
    'MatchController.getByChampionship'
  )

  Route.resource('pools', 'PoolController').apiOnly()

  Route.resource('guesses', 'GuessController').apiOnly()

  Route.resource('championships', 'ChampionshipController').apiOnly()

  Route.resource('participants', 'ParticipantController').apiOnly()

  Route.get('ranking/:id/:round?', 'PoolController.ranking')
}).middleware('auth')
