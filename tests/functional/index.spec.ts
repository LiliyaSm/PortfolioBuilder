import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'

test.group('List portfolios', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('return empty list when there are no portfolios', async ({ client }) => {
    const user = await UserFactory.query().create()
    const response = await client.get('api/portfolios').loginAs(user)
    response.assertStatus(200)
    response.assertBodyContains({})
  })

  test('get a list of existing portfolios', async ({ client }) => {
    const user = await UserFactory.query().with('portfolios', 2).create()
    const response = await client.get('api/portfolios').loginAs(user)

    response.assertBodyContains(user.toJSON().portfolios)
    response.assertStatus(200)
  })

  test('user must be logged in before viewing the portfolios', async ({ client }) => {
    await UserFactory.query().with('portfolios', 2).create()
    const response = await client.get('api/portfolios')

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    })
  })
})
