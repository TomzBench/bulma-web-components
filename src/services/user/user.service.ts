import { inject } from 'inversify';
import { IoService } from '../io/io.service';
import { bind } from '../../ioc/container.root';
import { SYMBOLS } from '../../ioc/constants.root';
import { User } from './types';
import { API } from './constants';
import { BehaviorSubject } from 'rxjs';

interface LoginResponse {
  user: User;
  accessToken: string;
}

@bind(SYMBOLS.USER_SERVICE)
export class UserService {
  user = new BehaviorSubject<User | undefined>(undefined);

  constructor(@inject(SYMBOLS.IO_SERVICE) private io: IoService) {}

  async login(email: string, password: string): Promise<User> {
    let resp = await this.io.post<LoginResponse>(API.LOGIN, {
      email,
      password
    });
    console.log(await this.io.get(API.REFRESH));
    this.io.setHeader('Authorization', `Bearer ${resp.json.accessToken}`);
    this.user.next(resp.json.user);
    return resp.json.user;
  }
}
