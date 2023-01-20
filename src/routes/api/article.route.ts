import express from 'express';
import { ArticleController } from '../../controllers';
import { authJwt } from '../../middleware';

const ArticlesRouter = express.Router();

ArticlesRouter.get('/', ArticleController.fetch);
ArticlesRouter.get('/:id', ArticleController.find);
ArticlesRouter.post('/', authJwt.verifyToken, ArticleController.create);
ArticlesRouter.put('/:id', authJwt.verifyToken, ArticleController.update);
ArticlesRouter.delete(
  '/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  ArticleController.remove
);

export default ArticlesRouter;
