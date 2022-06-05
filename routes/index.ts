import {Application, Router} from 'express';
import api from './api'

class Routes {
    static configure(app: Application) {
        app.use('/api', api(Router()));
    }
}

module.exports = Routes;
