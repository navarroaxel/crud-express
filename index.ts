import 'dotenv/config';
import express from 'express';
import Routes from './src/routes';
import morgan from 'morgan';
import { MongoService } from './src/services';
import initializeRoles from './src/common/initializeDb';

const app = express();

app.use(morgan(':method :url'));
app.use(express.json());

Routes.configure(app);

const PORT = process.env.PORT;

MongoService.connectDb(process.env.MONGO_URL_DEV as string);

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});

initializeRoles();
