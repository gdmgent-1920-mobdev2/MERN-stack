import { NextFunction, Request, Response } from "express";

class FallbackController {
  public index (req: Request, res: Response, next: NextFunction): Response<any> | void {
    return next(new Error('Route doesn\'t exist!'))
  }
}

export default FallbackController;