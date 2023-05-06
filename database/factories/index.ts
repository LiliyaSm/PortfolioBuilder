import Factory from '@ioc:Adonis/Lucid/Factory'
import Portfolio from 'App/Models/Portfolio'
import Project from 'App/Models/Project'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }
})
  .relation('portfolios', () => PortfolioFactory)
  .build()

export const ProjectFactory = Factory.define(Project, ({ faker }) => {
  return {
    clientName: faker.lorem.words(5),
    size: 'small',
    actions: 'actions',
    outcome: 'outcome',
  }
})
  // .relation('ski', () => ProjectFactory)
  .build()

export const PortfolioFactory = Factory.define(Portfolio, ({ faker }) => {
  return {
    name: faker.lorem.words(5),
    // content: faker.lorem.paragraphs(3),
  }
})
  .relation('projects', () => ProjectFactory)
  .build()
