import { default as App } from './app';

(() => {
  const app: App = new App();
  app.start();

  const stopAllProcesses = () => {
    app.stop();

    console.log('Stopped all processes');
  };

  process.on('SIGINT', () => stopAllProcesses());
  process.on('SIGTERM', () => stopAllProcesses());
})(); // IIFE
