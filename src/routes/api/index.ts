import express from 'express';
import ArticlesRouter from './article.route';
import CommentRouter from './comment.route';

const ApiRouter = express.Router();

ApiRouter.use('/articles', ArticlesRouter);
ApiRouter.use('/comments', CommentRouter);

export default ApiRouter;
