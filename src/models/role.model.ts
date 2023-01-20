import mongoose from 'mongoose';
import { RoleList } from '../common/rolesEnum';

interface IRole {
  type: string;
}

const RoleSchema = new mongoose.Schema(
  {
    type: { type: String, enum: RoleList, required: true, unique: true },
  },
  { timestamps: true, versionKey: false }
);

const RoleModel = mongoose.model<IRole>('Role', RoleSchema);

export { RoleModel, IRole };
