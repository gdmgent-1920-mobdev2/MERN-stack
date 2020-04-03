import { Application, Request, Response, NextFunction } from 'express';
import { default as path } from 'path';

import ApiRouter from '../api/router';
import { HomeController, FallbackController } from '../controllers';
import { IConfig, AuthService, Environment } from '../services';

export default class Router {
  private app: Application;
  private apiRouter: ApiRouter;
  private config: IConfig;
  private authService: AuthService;
  private homeController: HomeController;
  private fallbackController: FallbackController;

  constructor(
    app: Application,
    rootPath: string,
    config: IConfig,
    authService: AuthService,
  ) {
    this.app = app;
    this.config = config;
    this.authService = authService;

    this.homeController = new HomeController();
    this.fallbackController = new FallbackController();

    this.apiRouter = new ApiRouter(config, authService);
    this.registerRoutes(rootPath);
  }

  private registerRoutes(rootPath: string): void {
    //this.app.route(['/', '/home']).all(this.homeController.index);
    this.app.use('/api', this.apiRouter.router);
    /*
     * this.app.use('/*', this.fallbackController.index);
     * Vervangen door de React Client (volledige integratie)
     */
    this.app.use('/', (req: Request, res: Response, next: NextFunction) => {
      if (this.config.env === Environment.production) {
        res.sendFile(path.join(rootPath, '../client/index.html'));
      } else {
        res.sendFile(
          path.join(rootPath, '/../../../react-client/build/index.html'),
        );
      }
    });
  }
}
