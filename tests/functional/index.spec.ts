import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'
import { PortfolioFactory } from 'Database/factories'
import Portfolio from 'App/Models/Portfolio'

test.group('List portfolios', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('return empty list when there are no portfolios', async ({ client, route }) => {
    const user = await UserFactory.query().create()
    const response = await client.get('api/portfolios').loginAs(user)
    response.assertStatus(200)
    response.assertBodyContains({})
  })

  test('get a list of existing portfolios', async ({ client, assert }) => {
    const user = await UserFactory.query().with('portfolios', 2).create()
    const response = await client.get('api/portfolios').loginAs(user)

    response.assertBodyContains(user.toJSON().portfolios)
    response.assertStatus(200)
  })
})
