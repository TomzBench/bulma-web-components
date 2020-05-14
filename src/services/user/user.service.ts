import { inject } from 'inversify';
import { IoService } from '../io/io.service';
import { bind } from '../../ioc/container.root';
import { SYMBOLS } from '../../ioc/constants.root';
import { User } from './types';
import { API } from './constants';
import { BehaviorSubject } from 'rxjs';

interface TokenResponse {
  user: User;
  accessToken: string;
}

@bind(SYMBOLS.USER_SERVICE)
export class UserService {
  user = new BehaviorSubject<User | undefined>(undefined);

  constructor(@inject(SYMBOLS.IO_SERVICE) private io: IoService) {
    this.io
      .get<TokenResponse>(API.REFRESH)
      .then(resp => {
        this.io.setHeader('Authorization', `Bearer ${resp.json.accessToken}`);
        this.user.next(resp.json.user);
      })
      .catch(e => {});
  }

  async login(email: string, password: string): Promise<User> {
    let resp = await this.io.post<TokenResponse>(API.LOGIN, {
      email,
      password
    });
    this.io.setHeader('Authorization', `Bearer ${resp.json.accessToken}`);
    this.user.next(resp.json.user);
    return resp.json.user;
  }

  async logout(): Promise<void> {
    await this.io.get<string>(API.LOGOUT);
    this.user.next(undefined);
    this.io.removeHeader('Authorization');
  }
}
