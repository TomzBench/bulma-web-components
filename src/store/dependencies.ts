import { UserService } from '../services/user/user.service';
import { RouterService } from '../services/router/router.service';

// These are injected into all Epics...
export type Dependencies = { users: UserService; router: RouterService };
