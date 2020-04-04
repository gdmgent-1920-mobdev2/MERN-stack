import { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import {
  serve as swaggerServe,
  setup as swaggerSetup,
} from 'swagger-ui-express';
import path from 'path';

import { IConfig, Environment } from '../../services';

class SwaggerMiddleware {
  public static load(rootPath: string, app: Application, config: IConfig): void {
    const swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: 'New Media Development API',
          version: '1.0.0',
          description: 'The Express API with autogenerated swagger doc',
        },
      },
      apis: [
        (config.env === Environment.development) ? path.resolve(rootPath, 'api/router/index.ts') : path.resolve(rootPath, 'api/router/index.js')
      ],
    };
    const swaggerSpecs = swaggerJsdoc(swaggerOptions);

    app.get('/swagger.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpecs);
    });

    app.use('/api/docs', swaggerServe, swaggerSetup(swaggerSpecs));
  }
}

export default SwaggerMiddleware;
