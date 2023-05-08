import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

const projectMock = {
  size: 'small',
  actions: 'actions',
  outcome: 'outcome',
  clientDescription: 'clientDescription',
  clientIndustry: 'clientIndustry',
  projectDescription: 'projectDescription',
  startDate: '2020-01-01',
  endDate: '2020-01-05',
  cloud: 'none',
  projectName: 'projectName',

  skills: [
    {
      value: 'js',
      type: 'language',
    },
  ],
}

const projectMockAllFields = {
  ...projectMock,
  clientName: 'clientName',
}

test.group('store', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('user must be logged in before creating the portfolio', async ({ client, route }) => {
    const response = await client.post(route('PortfoliosController.store')).form({
      name: 'Portfolio name',
    })

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    })
  })

  test('user must be logged in before creating the project', async ({ client, route }) => {
    const response = await client.post(route('ProjectsController.store', { id: 1 })).form({
      name: 'project name',
    })

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    })
  })

  test('make sure project required fields are provided', async ({ client, route }) => {
    const user = await UserFactory.query().with('portfolios', 2).create()
    const { id } = user.portfolios[0]

    const response = await client
      .post(route('ProjectsController.store', { id }))
      .loginAs(user)
      .form(projectMock)

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'clientName is required', field: 'clientName', rule: 'required' }],
    })
  })

  test('should create a project', async ({ client, route }) => {
    const user = await UserFactory.query().with('portfolios', 2).create()
    const { id } = user.portfolios[0]

    const response = await client
      .post(route('ProjectsController.store', { id }))
      .loginAs(user)
      .form(projectMockAllFields)

    response.assertStatus(201)
  })

  test('should create a portfolio', async ({ client, route }) => {
    const user = await UserFactory.query().create()
    const response = await client.post(route('PortfoliosController.store')).loginAs(user).form({
      name: 'Portfolio name',
    })

    response.assertStatus(201)
  })
})
