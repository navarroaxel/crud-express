import express from 'express';
import { ArticleController } from '../../controllers';

const ArticlesRouter = express.Router();

ArticlesRouter.get('/', ArticleController.fetch);
ArticlesRouter.get('/:id', ArticleController.find);
ArticlesRouter.post('/', ArticleController.create);
ArticlesRouter.put('/:id', ArticleController.update);
ArticlesRouter.delete('/:id', ArticleController.remove);

export default ArticlesRouter;
