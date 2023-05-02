import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Portfolio from 'App/Models/Portfolio'

export default class PortfoliosController {
  public async index() {
    const portfolios = await Portfolio.all()
    return portfolios
  }

  public async viewOne({ params, response }: HttpContextContract) {
    const portfolio = await Portfolio.query()
      .preload('projects')
      .where({ id: params.id })
      .firstOrFail()

    if (!portfolio)
      return response.status(422).send({
        status: 'Not Found',
        error: 'Portfolio not found',
      })
    return portfolio
  }

  public async store({ response }: HttpContextContract) {
    response.status(201)
    const portfolio = await Portfolio.create({})
    portfolio.user_id = 1
    await portfolio.save()
    return portfolio
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params
    const data = request.body()
    const project = await Portfolio.findByOrFail('id', id)
    return await project.merge(data).save()
  }

  public async delete({ response, params }: HttpContextContract) {
    const portfolio = await Portfolio.findOrFail(params.id)
    response.status(204)
    return await portfolio?.delete()
  }
}
