export interface Alert {
  who: string;
  what: string;
  where: string;
  when: number;
  mesg: string;
  serial: string;
}

export type State = {
  alerts: Alert[];
  loading: boolean;
};

export const initial: State = {
  alerts: [],
  loading: false
};
