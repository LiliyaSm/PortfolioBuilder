import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('update', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('user must be logged in before deleting the portfolio', async ({ client, route }) => {
    const response = await client.delete(route('PortfoliosController.delete', { id: 1 }))

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    })
  })

  test('user must be logged in before deleting the project', async ({ client, route }) => {
    const response = await client.delete(route('ProjectsController.delete', { id: 1 }))

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    })
  })

  test('should delete a project', async ({ client, route }) => {
    const user = await UserFactory.query()
      .with('portfolios', 1, (q) => q.with('projects'))
      .create()
    const { id } = user.portfolios[0].$preloaded.projects[0]

    const response = await client.delete(route('ProjectsController.delete', { id })).loginAs(user)

    response.assertStatus(204)
  })

  test('should delete a portfolio', async ({ client, route }) => {
    const user = await UserFactory.query().with('portfolios', 1).create()
    const { id } = user.portfolios[0]

    const response = await client.delete(route('PortfoliosController.delete', { id })).loginAs(user)

    response.assertStatus(204)
  })
})
