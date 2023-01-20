import mongoose from 'mongoose';
import { Role } from './index';

interface IUser {
  userName: string;
  email: string;
  password: string;
  roles: Role.IRole[];
}

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    roles: [{ ref: 'Role', type: mongoose.Types.ObjectId }],
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel, IUser };
