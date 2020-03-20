import {
  default as express,
  Application,
  Request,
  Response,
  Router,
} from 'express';
import { HelloController, MessageController, PostController } from '../controllers';

class ApiRouter {
  public router: Router;
  private helloController: HelloController;
  private messageController: MessageController;
  private postController: PostController;

  constructor() {
    this.router = express.Router();

    this.registerControllers();
    this.registerRoutes();
  }

  private registerControllers(): void {
    this.helloController = new HelloController();
    this.messageController = new MessageController();
    this.postController = new PostController();
  }

  private registerRoutes(): void {
    this.router.get('/hello', this.helloController.index);
    this.router.get('/messages', this.messageController.index);
    this.router.get('/messages/:id', this.messageController.show);
    this.router.get('/posts', this.postController.index);
    this.router.get('/posts/:id', this.postController.show);
  }
}

export default ApiRouter;
