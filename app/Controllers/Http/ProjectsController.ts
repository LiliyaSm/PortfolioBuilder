import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import Portfolio from 'App/Models/Portfolio'

export default class ProjectsController {
  public async view({ params, response }: HttpContextContract) {
    const project = await Project.find(params.id)
    if (!project)
      return response.status(422).send({
        status: 'Not Found',
        error: 'Project not found',
      })
    return project
  }

  public async store({ response, request, params }: HttpContextContract) {
    response.status(201)
    const data = request.body()

    const { project, skills } = data
    //check the project exists
    const portfolio = await Portfolio.find(params.id)
    if (!portfolio)
      return response.status(422).send({
        status: 'Not Found',
        error: 'Portfolio not found',
      })
    const newProject = await Project.create({
      ...project,
      portfolio_id: params.id,
    })

    await newProject.related('skills').createMany(skills)

    return newProject
  }

  public async update({ request, params, response }: HttpContextContract) {
    const data = request.body()
    const project = await Project.find(params.id)
    if (!project)
      return response.status(422).send({
        status: 'Not Found',
        error: 'Project not found',
      })
    return await project.merge(data).save()
  }

  public async delete({ response, params }: HttpContextContract) {
    const portfolio = await Project.findOrFail(params.id)
    response.status(204)
    return await portfolio?.delete()
  }
}
