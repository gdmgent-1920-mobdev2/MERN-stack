import { NextFunction, Request, Response } from "express";

class HomeController {
  public index (req: Request, res: Response, next: NextFunction): Response<any> | void {
    res.status(200).json({ message: 'Greatings Earthlings!'});
  }
}

export default HomeController;