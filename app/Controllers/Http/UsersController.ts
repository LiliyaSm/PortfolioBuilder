// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/UserValidator'

export default class UsersController {
  // public async view({ view }) {
  //   const users = await User.all()
  //   return view.render('portfolios', { users })
  // }
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    return await User.create(payload)
  }
}
