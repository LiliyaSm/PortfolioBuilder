import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

const projectMock = {
  size: 'updatedSize',
  skills: [
    {
      value: 'js',
      type: 'language',
    },
  ],
}

test.group('update', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('user must be logged in before updating the portfolio', async ({ client, route }) => {
    const response = await client.put(route('PortfoliosController.update', { id: 1 })).form({
      name: 'Portfolio name',
    })

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    })
  })

  test('user must be logged in before updating the project', async ({ client, route }) => {
    const response = await client.put(route('ProjectsController.update', { id: 1 })).form({
      name: 'Portfolio name',
    })

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    })
  })

  test('should update a project', async ({ client, route }) => {
    const user = await UserFactory.query()
      .with('portfolios', 1, (q) => q.with('projects'))
      .create()
    const { id } = user.portfolios[0].$preloaded.projects[0]

    const response = await client
      .put(route('ProjectsController.update', { id }))
      .loginAs(user)
      .form(projectMock)

    response.assertStatus(200)
  })

  test('should update a portfolio', async ({ client, route }) => {
    const user = await UserFactory.query().with('portfolios', 1).create()
    const { id } = user.portfolios[0]

    const response = await client
      .put(route('PortfoliosController.update', { id }))
      .loginAs(user)
      .form({
        name: 'Updated portfolio name',
      })

    response.assertStatus(200)
  })
})
