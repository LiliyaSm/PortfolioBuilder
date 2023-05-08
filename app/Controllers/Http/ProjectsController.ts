import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import { PORTFOLIO_NOT_FOUND, PROJECT_NOT_FOUND, UNAUTHORIZED_ACCESS } from 'App/constants'
import ProjectValidator from 'App/Validators/ProjectValidator'

export default class ProjectsController {
  public async view({ params, response, auth }: HttpContextContract) {
    const project = await Project.find(params.id)
    if (!project) return response.status(422).send(PROJECT_NOT_FOUND)

    await project.load('portfolio')
    if (project.portfolio.userId !== auth.user!.id) {
      return response.status(401).send(UNAUTHORIZED_ACCESS)
    }

    await project.load('skills')
    return project
  }

  public async store({ response, request, params, auth }: HttpContextContract) {
    const data = await request.validate(ProjectValidator)
    const { skills, ...project } = data

    //check the portfolio exists
    const portfolio = await auth
      .user!.related('portfolios')
      .query()
      .where({ id: params.id })
      .first()

    if (!portfolio) return response.status(422).send(PORTFOLIO_NOT_FOUND)
    const newProject = await Project.create({
      ...project,
      portfolioId: params.id,
    })

    await newProject.related('skills').createMany(skills)
    await newProject.load('skills')
    return response.created(newProject)
  }

  public async update({ request, params, response, auth }: HttpContextContract) {
    const updatedProject = request.body()
    const project = await Project.query()
      .preload('portfolio')
      .preload('skills')
      .where({ id: params.id })
      .first()

    if (!project) return response.status(422).send(PROJECT_NOT_FOUND)

    if (project.portfolio.userId !== auth.user!.id) {
      return response.status(401).send(UNAUTHORIZED_ACCESS)
    }

    // update project entity fields
    await project.merge(updatedProject).save()

    // find skills removed and delete them from database
    const toDelete = project.skills.filter((s) => !updatedProject.skills.find((x) => x.id === s.id))
    for (let skill of toDelete) {
      await skill.delete()
    }

    // find skills created and create them in database
    const toCreate = updatedProject.skills.filter((s) => !project.skills.find((x) => x.id === s.id))
    console.log(toCreate)
    await project.related('skills').createMany(toCreate)

    // refresh skills to return updated list in response
    await project.load('skills')

    return project
  }

  public async delete({ response, params, auth }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    if (!project) return response.status(422).send(PROJECT_NOT_FOUND)
    await project.load('portfolio')

    if (project.portfolio.userId !== auth.user!.id) {
      return response.status(401).send(UNAUTHORIZED_ACCESS)
    }

    await project?.delete()

    return response.noContent()
  }
}
