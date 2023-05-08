import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class PortfolioValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.maxLength(150)]),
  })
}
