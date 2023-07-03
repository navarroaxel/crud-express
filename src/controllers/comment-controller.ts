import { NextFunction, Request, Response } from 'express';
import CommentService from '../services/comment-service';
import ArticleService from '../services/article-service';
import BadRequestError from '../models/bad-request-error';
import CommentNotFoundError from '../models/comment-not-found-error';
import http from 'http2';

class CommentController {
    static async find(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const articleId = req.query.article as string;
            if (!articleId) return next(new BadRequestError());
            res.status(http.constants.HTTP_STATUS_OK).json(await CommentService.findByArticleId(articleId));
        } catch (err: unknown) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const article = await ArticleService.find(req.body.comment.article);
            if (!article) return next(new BadRequestError());

            const comment = await CommentService.create(req.body.comment);
            res.status(http.constants.HTTP_STATUS_CREATED).json(comment);
        } catch (err: unknown) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await CommentService.update(req.params.id, req.body.comment);
            if (!result) return next(new CommentNotFoundError());

            res.status(http.constants.HTTP_STATUS_OK).json(result);
        } catch (err: unknown) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await CommentService.remove(req.params.id);
            if (!result) return next(new CommentNotFoundError());

            res.status(http.constants.HTTP_STATUS_OK).json(result);
        } catch (err: unknown) {
            next(err);
        }
    }
}

export default CommentController;