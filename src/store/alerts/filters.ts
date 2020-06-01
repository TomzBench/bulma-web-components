import { Alert } from './state';
export interface AlertFromServer extends Omit<Alert, 'when'> {
  when: number;
}

export function fromServer(alertss: AlertFromServer[]): Alert[] {
  return alertss.map(alerts => {
    return {
      ...alerts,
      when: new Date(alerts.when * 1000).toString()
    };
  });
}
