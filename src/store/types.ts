type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export interface Action<Type extends string = string> {
  type: Type;
}

type ActionPayload<K extends string, TAction extends Action<K>> = Omit<
  TAction,
  'type'
>;
export function actionCreator<
  TAction extends Action<K>,
  K extends string = string
>(type: K) {
  return function(payload?: ActionPayload<K, TAction>) {
    return payload ? { ...payload, type } : { type };
  };
}

export function dispatchEvent<A extends Action>(el: Element, action: A) {
  el.dispatchEvent(
    new CustomEvent<A>(`atx-dispatch`, {
      bubbles: true,
      composed: true,
      detail: action
    })
  );
}
