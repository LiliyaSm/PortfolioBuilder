import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PORTFOLIO_NOT_FOUND } from 'App/constants'
import PortfolioValidator from 'App/Validators/PortfolioValidator'

export default class PortfoliosController {
  public async index({ auth }: HttpContextContract) {
    const portfolios = await auth.user!.related('portfolios').query()
    return portfolios
  }

  public async viewOne({ params, response, auth }: HttpContextContract) {
    const portfolio = await auth
      .user!.related('portfolios')
      .query()
      .preload('projects', (p) => p.preload('skills'))
      .where({ id: params.id })
      .first()

    if (!portfolio) return response.status(422).send(PORTFOLIO_NOT_FOUND)
    return portfolio
  }

  public async store({ response, auth }: HttpContextContract) {
    const portfolio = await auth.user!.related('portfolios').create({})
    return response.created(portfolio)
  }

  public async update({ request, params, response, auth }: HttpContextContract) {
    const { id } = params
    const data = await request.validate(PortfolioValidator)

    const portfolio = await auth.user!.related('portfolios').query().where('id', id).firstOrFail()
    if (!portfolio) return response.status(422).send(PORTFOLIO_NOT_FOUND)

    return await portfolio.merge(data).save()
  }

  public async delete({ response, params, auth }: HttpContextContract) {
    const portfolio = await auth
      .user!.related('portfolios')
      .query()
      .where('id', params.id)
      .firstOrFail()
    await portfolio?.delete()

    return response.noContent()
  }
}
