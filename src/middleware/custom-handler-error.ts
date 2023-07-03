import {Request, Response, NextFunction} from 'express';
import BadRequestError from '../models/bad-request-error';
import ResourceNotFoundError from '../models/resource-not-found';
import ArticleNotFoundError from '../models/article-not-found-error';
import CommentNotFoundError from '../models/comment-not-found-error';
import mongoose from 'mongoose';
import http from 'http2';

export const handlerError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (
        err instanceof BadRequestError ||
        err instanceof ArticleNotFoundError ||
        err instanceof CommentNotFoundError ||
        err instanceof mongoose.Error.ValidationError ||
        err instanceof mongoose.Error.CastError
    ) {
        return res.status(http.constants.HTTP_STATUS_BAD_REQUEST).json({ message: err.message });
    }
    if (err instanceof ResourceNotFoundError) {
        return res.status(http.constants.HTTP_STATUS_NOT_FOUND).json({ message: err.message });
    }
    res.status(http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    next();
};