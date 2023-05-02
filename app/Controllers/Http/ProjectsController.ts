import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'

export default class ProjectsController {
  public async view({ params }: HttpContextContract) {
    return await Project.findOrFail(params.id)
  }

  public async store({ response, request, params }: HttpContextContract) {
    response.status(201)
    const data = request.body()
    return await Project.create({
      ...data,
      portfolio_id: params.id,
    })
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.body()
    const project = await Project.findOrFail(params.id)
    return await project.merge(data).save()
  }

  public async delete({ response, params }: HttpContextContract) {
    const portfolio = await Project.findOrFail(params.id)
    response.status(204)
    return await portfolio?.delete()
  }
}
