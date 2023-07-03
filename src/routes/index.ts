import { Router, Application } from 'express';
import routes from './api';

class Routes {
    static configure(app: Application): void {
        app.use('/api', routes(Router()));
    }
}

export default Routes;
