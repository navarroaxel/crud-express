import express from 'express';
import { AuthController } from '../../controllers';

const AuthRouter = express.Router();

AuthRouter.post('/signin', AuthController.signIn);
AuthRouter.post('/signup', AuthController.signUp);
AuthRouter.get('/roles', AuthController.getRoles);
AuthRouter.get('/users', AuthController.getUsers);
AuthRouter.get('/users/:id', AuthController.getUserById);
AuthRouter.delete('/users/:id', AuthController.removeUser);
AuthRouter.delete('/roles/:id', AuthController.removeRole);

export default AuthRouter;
