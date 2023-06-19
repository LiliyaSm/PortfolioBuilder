// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StatisticsController {
  public async statistics() {
    return {
      skills: {
        languages: {
          labels: ['Javascript', 'Python', 'Java', 'Other'],
          data: [55, 23, 10, 20],
        },
        frameworks: {
          labels: ['React', 'Django', 'Spring', 'Other'],
          data: [35, 20, 6, 25],
        },
        tools: {
          labels: ['Visual Studio Code', 'IntelliJ IDEA', 'Jira', 'Other'],
          data: [15, 15, 7, 13],
        },
      },
      users: 10,
      portfolios: 10,
      projects: 15,
      happiness: '100%',
    }
  }
}
