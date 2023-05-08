import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'

test.group('show', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('return 422 when portfolio does not exists', async ({ client, route }) => {
    const user = await UserFactory.query().with('portfolios', 2).create()

    const response = await client
      .get(route('PortfoliosController.viewOne', { id: 1 }))
      .loginAs(user)

    response.assertStatus(422)
  })

  test('get portfolio by id', async ({ client, route }) => {
    const user = await UserFactory.query().with('portfolios', 1).create()
    const { id } = user.portfolios[0]

    const response = await client.get(route('PortfoliosController.viewOne', { id })).loginAs(user)
    response.assertStatus(200)
    response.assertBodyContains(user.portfolios[0].toJSON())
  })

  test('return 422 when project does not exists', async ({ client, route }) => {
    const user = await UserFactory.query()
      .with('portfolios', 1, (q) => q.with('projects'))
      .create()
    const response = await client.get(route('ProjectsController.view', { id: 1 })).loginAs(user)

    response.assertStatus(422)
  })

  test('get project by id', async ({ client, route }) => {
    const user = await UserFactory.query()
      .with('portfolios', 1, (q) => q.with('projects'))
      .create()
    const { id } = user.portfolios[0].$preloaded.projects[0]

    const response = await client.get(route('ProjectsController.view', { id })).loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains(user.portfolios[0].$preloaded.projects[0].toJSON())
  })
  test('user must be logged in before viewing the projects', async ({ client, route }) => {
    const user = await UserFactory.query()
      .with('portfolios', 1, (q) => q.with('projects'))
      .create()
    const { id } = user.portfolios[0].$preloaded.projects[0]

    const response = await client.get(route('ProjectsController.view', { id }))

    response.assertStatus(401)
  })
})
