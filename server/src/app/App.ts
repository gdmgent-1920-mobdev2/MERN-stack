import { default as http, createServer, Server } from 'http';
import { default as express, Application} from 'express';

class App {
  public app: Application;
  private server: Server;

  constructor () {
    this.createExpress();
    this.createServer();
  }

  private createExpress (): void {
    this.app = express();
  }

  private createServer (): void {
    this.server = createServer(this.app);
    this.server.on('error', (error?: Error) => {
      if (error) {
        this.gracefulShutdown();
      }
    });
    this.server.on('listening', () => {
      console.log(`Server is listening on localhost:8080`);
    });
  }

  public start (): void {
    this.server.listen(8080, 'localhost');
  }

  public stop (): void {
    this.server.close((error?: Error) => {
      this.gracefulShutdown(error);
    });
  }

  private gracefulShutdown(error?: Error) {
    if (error) {
      process.exit(1);
    }
    process.exit();
  }
}

export default App;