import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { PortfolioFactory } from 'Database/factories'
import { ProjectFactory } from 'Database/factories'

test.group('Posts show', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('return 422 when portfolio does not exists', async ({ client, route }) => {
    const response = await client.get(route('PortfoliosController.viewOne', { id: 1 }))

    response.assertStatus(422)
  })

  test('get portfolio by id', async ({ client, route }) => {
    const portfolio = await PortfolioFactory.query().with('projects').create()
    const response = await client.get(route('PortfoliosController.viewOne', { id: portfolio.id }))

    response.assertStatus(200)
    response.assertBodyContains(portfolio.toJSON())
  })

  test('return 422 when project does not exists', async ({ client, route }) => {
    const response = await client.get(route('ProjectsController.view', { id: 1 }))

    console.log('response', response)
    response.assertStatus(422)
  })

  test('get project by id', async ({ client, route }) => {
    const project = await ProjectFactory.query().create()
    const response = await client.get(route('ProjectsController.view', { id: project.id }))

    response.assertStatus(200)
    response.assertBodyContains(project.toJSON())
  })
})
