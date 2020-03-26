import { default as express, Application } from 'express';
import { default as bodyParser } from 'body-parser';

import { default as cors } from 'cors';
import { default as helmet } from 'helmet';
import { default as path } from 'path';

class GlobalMiddleware {
  public static load(app: Application, rootPath: string) {
    console.log(path.join(rootPath, 'views'));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(express.static(path.join(rootPath, 'static')));
    app.set('views', path.join(rootPath, 'views'));
    app.set('view engine', 'ejs');

    // Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!
    app.use(helmet.hidePoweredBy());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());

    // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
    const corsOptions = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token'],
    };
    app.use(cors(corsOptions));
  }
}

export default GlobalMiddleware;
