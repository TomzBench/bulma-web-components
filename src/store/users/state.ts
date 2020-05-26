export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  devices: any[];
  role: number;
  accessToken: string;
}

export type State = {
  user: User | undefined;
  loading: boolean;
  ready: boolean;
  users: User[];
  count: number;
};

export const initial: State = {
  user: undefined,
  loading: false,
  ready: false,
  users: [],
  count: 0
};
