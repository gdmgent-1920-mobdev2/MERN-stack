import { Application } from 'express';

import ApiRouter from '../api/router';
import { HomeController, FallbackController } from '../controllers';
import { IConfig, AuthService } from '../services';

export default class Router {
  private app: Application;
  private apiRouter: ApiRouter;
  private authService: AuthService;
  private homeController: HomeController;
  private fallbackController: FallbackController;

  constructor(app: Application, config: IConfig, authService: AuthService) {
    this.app = app;
    this.authService = authService;

    this.homeController = new HomeController();
    this.fallbackController = new FallbackController();

    this.apiRouter = new ApiRouter(config, authService);
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.app.route(['/', '/home']).all(this.homeController.index);
    this.app.use('/api', this.apiRouter.router);
    this.app.use('/*', this.fallbackController.index);
  }
}
