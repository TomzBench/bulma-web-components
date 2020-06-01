export interface Alert {
  who: string;
  what: string;
  where: string;
  when: string;
  mesg: string;
  serial: string;
}

export type State = {
  alerts: Alert[];
  count: number;
  start: number;
  limit: number;
  sort: keyof Alert | undefined;
  search: { [P in keyof Alert]?: string };
  order: 'ASC' | 'DESC';
  loading: boolean;
};

export const initial: State = {
  alerts: [],
  count: 0,
  start: 0,
  limit: 10,
  sort: 'when',
  search: {},
  order: 'DESC',
  loading: false
};
