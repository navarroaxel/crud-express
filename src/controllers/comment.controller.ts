import { NextFunction, Request, Response } from 'express';
import { CommentService } from '../services';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await CommentService.fetch());
  } catch (error) {
    next(error);
  }
};

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await CommentService.find(req.params.id));
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await CommentService.create(req.body.comment));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await CommentService.update(req.params.id, req.body.comment));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await CommentService.delete(req.params.id));
  } catch (error) {
    next(error);
  }
};

const CommentController = {
  fetch,
  find,
  create,
  update,
  remove,
};

export default CommentController;
