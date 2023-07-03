import { ArticleController } from '../../controllers';
import { Router } from 'express';

export const articleRoutes = (router: Router) => {
    router.get('/', ArticleController.fetch);
    router.post('/', ArticleController.create);
    router.get('/:id', ArticleController.find);
    router.put('/:id', ArticleController.update);
    router.delete('/:id', ArticleController.remove);

    return router;
};
