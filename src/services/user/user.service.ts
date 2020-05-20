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

export class UserService {
  constructor(private io: IoService) {}

  async refresh() {
    let resp = await this.io.get<TokenResponse>(API.REFRESH);
    this.io.setHeader('Authorization', `Bearer ${resp.json.accessToken}`);
    return resp.json.user;
  }

  async login(email: string, password: string): Promise<User> {
    let resp = await this.io.post<TokenResponse>(API.LOGIN, {
      email,
      password
    });
    this.io.setHeader('Authorization', `Bearer ${resp.json.accessToken}`);
    return resp.json.user;
  }

  async logout(): Promise<void> {
    await this.io.get<string>(API.LOGOUT);
    this.io.removeHeader('Authorization');
  }

  async get(): Promise<User[]> {
    let resp = await this.io.get<User[]>(API.USERS);
    return resp.json;
  }
}
