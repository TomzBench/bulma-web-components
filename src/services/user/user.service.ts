import { inject } from 'inversify';
import { IoService } from '../io/io.service';
import { bind } from '../../ioc/ioc';
import { SYMBOLS } from '../../ioc/constants.root';
import { User } from './types';
import { API } from './constants';

@bind(SYMBOLS.USER_SERVICE)
export class UserService {
  currentUser?: User;
  constructor(@inject(SYMBOLS.IO_SERVICE) private io: IoService) {}

  async login(email: string, password: string): Promise<User> {
    await this.io.post(API.LOGIN, { email, password });
    // TODO receive ACCESS TOKEN, add to auth header.
    return {} as User;
  }
}
