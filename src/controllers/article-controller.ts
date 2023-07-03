import { Request, Response, NextFunction } from 'express';
import { IArticle } from '../models';
import ArticleService from '../services/article-service';
import CommentService from '../services/comment-service';
import ArticleNotFoundError from '../models/article-not-found-error';
import http from 'http2';

class ArticleController {
    
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            const articles = await ArticleService.fetch();
            res.status(http.constants.HTTP_STATUS_OK).json(articles);
        } catch (err: unknown) {
            next(err);
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        try {
            const article = await ArticleService.find(req.params.id);
            if (!article) return next(new ArticleNotFoundError());
            res.status(http.constants.HTTP_STATUS_OK).json(article);
        } catch (err: unknown) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const article = await ArticleService.create(req.body.article as IArticle);
            res.status(http.constants.HTTP_STATUS_CREATED).json(article);
        } catch (err: unknown) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ArticleService.update(req.params.id, req.body.article);
            if (!result) return next(new ArticleNotFoundError());
            res.status(http.constants.HTTP_STATUS_OK).json(result);
        } catch (err: unknown) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ArticleService.remove(req.params.id);
            if (!result) return next(new ArticleNotFoundError());
            const comments = await CommentService.remove(result.id);
            res.status(http.constants.HTTP_STATUS_OK).json({ article: result, comments: comments});
        } catch (err: unknown) {
            next(err);
        }
    }
}

export default ArticleController;
