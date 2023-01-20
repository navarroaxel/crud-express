import { User, Role } from '../models';
import { CryptService } from './';
import Jwt from 'jsonwebtoken';
import { RoleList } from '../common/rolesEnum';

const signIn = async (email: string, password: string) => {
  const userFound = await User.UserModel.findOne({ email: email }).populate(
    'roles'
  );
  if (userFound) {
    const matchPassword = await CryptService.comparePassword(
      password,
      userFound.password
    );
    if (matchPassword) {
      const token = await Jwt.sign(
        { id: userFound._id },
        process.env.SECRET as string,
        {
          expiresIn: 40000,
        }
      );
      return token;
    }
  }
  return null;
};

const signUp = async (user: User.IUser) => {
  user.password = await CryptService.encryptPassword(user.password);
  return User.UserModel.create(user);
};

const getRolesThatExists = async (roles: Role.IRole[]) => {
  const existingRoles = await Role.RoleModel.find({ type: { $in: roles } });
  return existingRoles;
};

const getBasicRole = async () => {
  return await Role.RoleModel.findOne({ type: RoleList.User });
};

const getRoleCount = async () => {
  return await Role.RoleModel.count();
};

const getRoles = () => {
  return Role.RoleModel.find().lean().exec();
};

const getUsers = () => {
  return User.UserModel.find()
    .select('-password')
    .populate('roles')
    .lean()
    .exec();
};

const getUserById = (id: string) => {
  return User.UserModel.findById(id)
    .select('-password')
    .populate('roles')
    .lean()
    .exec();
};

const removeUsers = (id: string) => {
  return User.UserModel.findByIdAndRemove(id).lean().exec();
};

const removeRole = (id: string) => {
  return Role.RoleModel.findByIdAndRemove(id).lean().exec();
};

const AuthService = {
  signIn,
  signUp,
  getRolesThatExists,
  getBasicRole,
  getRoleCount,
  getRoles,
  getUsers,
  removeUsers,
  removeRole,
  getUserById,
};

export default AuthService;
