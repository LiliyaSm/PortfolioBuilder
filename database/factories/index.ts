import Factory from '@ioc:Adonis/Lucid/Factory'
import Portfolio from 'App/Models/Portfolio'
import Project from 'App/Models/Project'
import User from 'App/Models/User'
import Skill from 'App/Models/Skill'

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

export const SkillsFactory = Factory.define(Skill, ({ faker }) => {
  return {
    type: faker.lorem.words(5),
    value: faker.lorem.words(5),
  }
}).build()

export const ProjectFactory = Factory.define(Project, ({ faker }) => {
  return {
    clientName: faker.lorem.words(5),
    size: 'small',
    actions: 'actions',
    outcome: 'outcome',
  }
})
  .relation('skills', () => SkillsFactory)
  .build()

export const PortfolioFactory = Factory.define(Portfolio, ({ faker }) => {
  return {
    name: faker.lorem.words(5),
  }
})
  .relation('projects', () => ProjectFactory)
  .build()
