import { Console } from 'console';
import { Role } from '../models';
import { RoleList } from './rolesEnum';

const initializeRoles = async () => {
  const count = await Role.RoleModel.count();
  if (count > 0) return;
  await Promise.all([
    Role.RoleModel.create({ type: RoleList.Admin }),
    Role.RoleModel.create({ type: RoleList.Moderator }),
    Role.RoleModel.create({ type: RoleList.User }),
  ]);
  console.log('Roles Created');
};

export default initializeRoles;
