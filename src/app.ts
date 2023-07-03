import express, { Application} from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from './routes';
import { handlerError } from './middleware/custom-handler-error';

export class App {
    
    createApp(): Application {
        const app = express();
        app.use(logger('dev'));
        app.use(bodyParser.json());
        
        Routes.configure(app);

        app.use(handlerError);

        return app;
    }
}