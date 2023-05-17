import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class ProjectValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.maxLength(150)]),
    isDraft: schema.boolean.optional(),
    clientName: schema.string(),
    clientDescription: schema.string.optional(),
    clientIndustry: schema.string(),
    projectName: schema.string(),
    projectDescription: schema.string(),
    size: schema.string(),
    teamSize: schema.string(),
    role: schema.string(),
    projectType: schema.string(),
    cloud: schema.string(),
    startDate: schema.date(),
    endDate: schema.date.optional(),
    actions: schema.string(),
    outcome: schema.string(),
    skills: schema.array().members(
      schema.object().members({
        value: schema.string(),
        type: schema.string(),
      })
    ),
  })
}
