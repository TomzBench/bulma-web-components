export interface Device {
  serial: string;
  siteId: string;
  mac: string;
  product: string;
  prjVersion: string;
  atxVersion: string;
  webVersion: string;
  lastSeen: number;
}

export type State = {
  devices: Device[];
  loading: boolean;
};

export const initial: State = {
  devices: [],
  loading: false
};
