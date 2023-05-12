import User from '../../Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    const user = await User.create(payload)
    const { firstName, lastName, id } = user
    let { token } = await auth.use('api').generate(user)
    const newUser = { id, firstName, lastName, token }
    return newUser
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.body()
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized({
        status: 'unauthorized',
        error: 'Invalid password or email',
      })
    }
  }
}
