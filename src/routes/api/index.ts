import { Router } from 'express';
import { articleRoutes } from './articles';
import { commentRoutes } from './comment';
import ResourceNotFoundError from '../../models/resource-not-found';

const routes = (router: Router) => {
    router.use('/articles', articleRoutes(Router()));
    router.use('/comments', commentRoutes(Router()));
    router.use('*', () => {
        throw new ResourceNotFoundError();
    });
  
    return router;
};

export default routes;