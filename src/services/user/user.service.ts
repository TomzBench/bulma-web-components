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
  user = new BehaviorSubject<User | undefined>(undefined);
  ready: Promise<void>;
  private _resolve!: () => void;
  private _reject!: (e: any) => void;

  constructor(private io: IoService) {
    this.ready = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  async refresh() {
    this.io
      .get<TokenResponse>(API.REFRESH)
      .then(resp => {
        this.io.setHeader('Authorization', `Bearer ${resp.json.accessToken}`);
        this.user.next(resp.json.user);
        this._resolve();
      })
      .catch(e => this._reject(e));
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
