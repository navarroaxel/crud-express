import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await ArticleService.fetch());
  } catch (error) {
    next(error);
  }
};

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await ArticleService.find(req.params.id));
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await ArticleService.create(req.body.article));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await ArticleService.update(req.params.id, req.body.article));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ArticleService.remove(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const ArticleController = {
  fetch,
  find,
  create,
  update,
  remove,
};

export default ArticleController;
