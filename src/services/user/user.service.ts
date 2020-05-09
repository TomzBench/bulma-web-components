import { inject } from 'inversify';
import { IoService } from '../io/io.service';
import { bind } from '../../ioc/container.root';
import { SYMBOLS } from '../../ioc/constants.root';
import { User } from './types';
import { API } from './constants';

@bind(SYMBOLS.USER_SERVICE)
export class UserService {
  currentUser?: User;

  constructor(@inject(SYMBOLS.IO_SERVICE) private io: IoService) {}

  // TODO - set IO header
  async login(email: string, password: string): Promise<User> {
    let response = await this.io.post<User>(API.LOGIN, { email, password });
    this.currentUser = response.json;
    return this.currentUser;
  }
}
