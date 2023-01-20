import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services';
import jwt from 'jsonwebtoken';
import { Role } from '../models';
import { RoleList } from '../common/rolesEnum';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(403).send('Unathorized');

    const decoded = jwt.verify(token as string, process.env.SECRET as string);

    const user = await AuthService.getUserById((<any>decoded).id);

    if (!user) return res.status(403).send('User Dont exists');

    res.locals.roles = user.roles;

    next();
  } catch (error) {
    return res.status(500).send('Error ocurred');
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const roles: Role.IRole[] = res.locals.roles;

  if (!roles.some((r) => r.type === RoleList.Admin))
    return res.status(401).send('User dont have enough privileges');

  next();
};

export { verifyToken, isAdmin };
