// TODO move these to login.container
export interface SubmitLoginEvent {
  email: string;
  password: string;
  redirect: string;
}

export interface SubmitLogoutEvent {
  redirect: string;
}
