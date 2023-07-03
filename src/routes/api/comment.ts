import { CommentController } from '../../controllers';
import { Router } from 'express';

export const commentRoutes = (router: Router) => {
    router.get('/', CommentController.find);
    router.post('/', CommentController.create);
    router.put('/:id', CommentController.update);
    router.delete('/:id', CommentController.remove);

    return router;
};
