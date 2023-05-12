import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'UsersController.register')
  Route.post('login', 'UsersController.login')

  Route.group(() => {
    Route.get('portfolios', 'PortfoliosController.index')
    Route.get('portfolios/:id', 'PortfoliosController.viewOne')
    Route.post('portfolios', 'PortfoliosController.store')
    Route.put('portfolios/:id', 'PortfoliosController.update')
    Route.delete('portfolios/:id', 'PortfoliosController.delete')

    Route.post('portfolios/:id/project', 'ProjectsController.store') // create project

    Route.get('projects/:id', 'ProjectsController.view')
    Route.put('projects/:id', 'ProjectsController.update')
    Route.delete('projects/:id', 'ProjectsController.delete')
  }).middleware('auth:api')
}).prefix('api')
