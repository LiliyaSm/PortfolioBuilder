import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class DraftProjectValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.maxLength(150)]),
    isDraft: schema.boolean.optional(),
    clientName: schema.string.optional(),
    clientDescription: schema.string.optional(),
    clientIndustry: schema.string.optional(),
    projectName: schema.string.optional(),
    projectDescription: schema.string.optional(),
    size: schema.string.optional(),
    cloud: schema.string.optional(),
    startDate: schema.date.optional(),
    endDate: schema.date.optional(),
    actions: schema.string.optional(),
    outcome: schema.string.optional(),
    skills: schema.array().members(
      schema.object().members({
        value: schema.string(),
        type: schema.string(),
      })
    ),
  })
}
