import { default as App } from './app';

import { default as Config, IConfig } from './app/services/config';
import Logger, { ILogger } from './app/services/logger';

(() => {
  // Create a Config service
  const config: IConfig = new Config();

  // Create a Logger service
  const logger: ILogger = new Logger();

  const app: App = new App(logger, config);
  app.start();

  const stopAllProcesses = () => {
    app.stop();

    console.log('Stopped all processes');
  };

  process.on('SIGINT', () => stopAllProcesses());
  process.on('SIGTERM', () => stopAllProcesses());
})(); // IIFE
