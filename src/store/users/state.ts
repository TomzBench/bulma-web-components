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
  users: User[];
};

export const initial: State = {
  user: undefined,
  users: []
};
