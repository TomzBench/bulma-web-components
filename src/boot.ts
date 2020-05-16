import { container } from './ioc/container.root';
import { UserService } from './services/user/user.service';
import { SYMBOLS } from './ioc/constants.root';
import './app-root';

async function awaitTimeout(timeout: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timeout);
  });
}

// Use our potential "refresh" token to log ourselves in, then start app
(async () => {
  const root = document.querySelector('.root');
  if (root) {
    const users = container.get<UserService>(SYMBOLS.USER_SERVICE);
    await users.refresh();
    const app = document.createElement('atx-root');
    root.appendChild(app);
  }
})();
