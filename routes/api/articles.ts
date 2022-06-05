import {Router} from 'express';
import {ArticleController} from '../../controllers';

const articlesApi = (router: Router) => {
    router.get('/', ArticleController.fetch);
    router.post('/', ArticleController.create);
    router.get('/:id', ArticleController.find);
    router.put('/:id', ArticleController.update);
    router.delete('/:id', ArticleController.remove);

    return router;
};

export default articlesApi;
