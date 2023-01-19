import { NextFunction, Response, Request } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debugger;
  res.status(500).send(err.message);
};
