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
    let response = await this.io.post<LoginResponse>(API.LOGIN, {
      email,
      password
    });
    this.user.next(response.json.user);
    return response.json.user;
  }
}
