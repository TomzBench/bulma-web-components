import { Action } from './types';

// Dispatch an action from a web component which is unware of redux
export function dispatchEvent<A extends Action>(el: Element, action: A) {
  el.dispatchEvent(
    new CustomEvent<A>(`atx-dispatch`, {
      bubbles: true,
      composed: true,
      detail: action
    })
  );
}
