import { UserService } from '../services/user/user.service';

// These are injected into all Epics...
export type Dependencies = { users: UserService };
