import { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import {
  serve as swaggerServe,
  setup as swaggerSetup,
} from 'swagger-ui-express';
import path from 'path';

import { IConfig } from '../../services';

class SwaggerMiddleware {
  public static load(app: Application, rootPath: string): void {
    const swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: 'New Media Development API',
          version: '1.0.0',
          description: 'The Express API with autogenerated swagger doc',
        },
      },
      apis: [path.join(rootPath, './api/router/index.ts')],
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