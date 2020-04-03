import { default as express, Application } from 'express';
import { default as bodyParser } from 'body-parser';

import { default as cors } from 'cors';
import { default as helmet } from 'helmet';
import { default as path } from 'path';

import { IConfig, Environment } from '../services';

class GlobalMiddleware {
  public static load(app: Application, rootPath: string, config: IConfig) {
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(express.static(path.join(rootPath, 'static')));
    app.set('views', path.join(rootPath, 'views'));
    app.set('view engine', 'ejs');
    /*
     * React Client build
     */
    if (config.env === Environment.production) {
      app.use(express.static(path.join(rootPath, '../client')));
    } else {
      app.use(
        express.static(path.join(rootPath, '/../../../react-client/build')),
      );
    }

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
