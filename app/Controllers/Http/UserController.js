'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

class UserController {
  async index() {
    const users = await User.all()

    return users
  }

  async store({ request }) {
    const data = request.only(['name', 'username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id)

    user.name = request.input('name', user.name)
    user.email = request.input('email', user.email)
    user.master = request.input('master', user.master)
    user.password = request.input('password', user.password)
    user.username = request.input('username', user.username)
    await user.save()

    return user
  }

  async destroy({ params, request, response }) {
    const user = await User.findOrFail(params.id)

    user.delete()
  }
}

module.exports = UserController
