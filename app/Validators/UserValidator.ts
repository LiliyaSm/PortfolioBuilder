import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class RegisterValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    firstName: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(3),
      rules.regex(/^[a-zA-Z0-9-_]+$/),
      rules.notIn(['admin', 'super', 'moderator', 'public', 'dev', 'alpha', 'mail']),
    ]),
    lastName: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(3),
      rules.regex(/^[a-zA-Z0-9-_]+$/),
      rules.notIn(['admin', 'super', 'moderator', 'public', 'dev', 'alpha', 'mail']),
    ]),
    // email: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
    // password: schema.string({}, [rules.minLength(8)]),
    email: schema.string({}, [rules.minLength(8)]),
  })
}
