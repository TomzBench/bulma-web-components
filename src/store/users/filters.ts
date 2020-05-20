import { UserAdd as UserAddServer } from '../../services/user/types';
import { UserAdd } from './action';
import { selectMap } from '../../shared/utils';

export function toServer(u: UserAdd): UserAddServer {
  return {
    ...u,
    role: selectMap(u.role, [
      'Admin',
      'Founder',
      'Developer',
      'Sales',
      'General'
    ])
  };
}
