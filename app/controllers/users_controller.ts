import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { registerUserValidator } from '#validators/user'

export default class UsersController {
  async login({ auth, request, response }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    
    response.redirect().toRoute('easy.home')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    response.redirect().toRoute('easy.home')
  }

  async register({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    await User.create({ email: payload.email, password: payload.password })

    session.flash('message', {
      type: 'positive',
      message: 'The user is registered successfully. Please use email and password to login',
    })

    response.redirect().toRoute('user.login')
  }
}
