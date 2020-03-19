import { Application, NextFunction, Request, Response } from "express";

import { FallbackController, HomeController } from '../controllers';

class Router {
  private app: Application;
  private homeController: HomeController;
  private fallbackController: FallbackController;

  constructor (app: Application) {
    this.app = app;

    this.registerControllers();
    this.registerRoutes();
  }

  private registerControllers () {
    this.fallbackController = new FallbackController();
    this.homeController = new HomeController();
  }

  private registerRoutes () {
    this.app.route(['/', '/home']).all(this.homeController.index);
    this.app.use('/*', this.fallbackController.index);
  }
}

export default Router;