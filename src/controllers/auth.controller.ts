import { NextFunction, Response, Request } from 'express';
import { Role, User } from '../models';
import { AuthService } from '../services';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await AuthService.signIn(req.body.email, req.body.password);
    if (token) {
      res.send(token);
      return;
    }
    res.status(401).send('Invalid credentials');
  } catch (error) {
    next(error);
  }
};
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User.UserModel({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    if (req.body.roles && req.body.roles.leght > 0) {
      req.body.roles = req.body.roles.map((r: string) => r.toUpperCase());
      user.roles = await AuthService.getRolesThatExists(req.body.roles);
    } else {
      const basicRole = await await AuthService.getBasicRole();
      if (basicRole) {
        user.roles.push(basicRole);
      }
    }
    const result = await AuthService.signUp(user);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await AuthService.getRoles());
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await AuthService.getUsers());
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await AuthService.getUserById(req.params.id));
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.removeUsers(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const removeRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.removeRole(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const AuthController = {
  signIn,
  signUp,
  getRoles,
  getUsers,
  removeUser,
  removeRole,
  getUserById,
};

export default AuthController;
