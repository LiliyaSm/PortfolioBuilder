import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Skill from 'App/Models/Skill'

export default class SkillsController {
  public async store({ request, params }: HttpContextContract) {
    const data = request.body()
    return await Skill.create({
      ...data,
      project_id: params.id,
    })
  }

  public async delete({ response, params }: HttpContextContract) {
    const skill = await Skill.findOrFail(params.id)
    response.status(204)
    return await skill?.delete()
  }
}
