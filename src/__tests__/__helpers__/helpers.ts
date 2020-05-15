import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
export function shadowQuery<T extends Element = Element>(
  el: Element | null,
  query: string
): T {
  expect(el).instanceof(Element);
  let ret = ((el as Element).shadowRoot as ShadowRoot).querySelector(query);
  return (ret as any) as T;
}

export function shadowQueryAll<T extends Element = Element>(
  el: Element | null,
  q: string
): NodeListOf<T> {
  expect(el).instanceof(Element);
  let ret = ((el as Element).shadowRoot as ShadowRoot).querySelectorAll(q);
  return (ret as any) as NodeListOf<T>;
}

export function query<T extends Element = Element>(
  el: Element | null,
  query: string
): T {
  expect(el).instanceof(Element);
  let ret = (el as Element).querySelector(query);
  return (ret as any) as T;
}

export function queryAll<T extends Element = Element>(
  el: Element | null,
  query: string
): NodeListOf<T> {
  expect(el).instanceof(Element);
  return (el as Element).querySelectorAll(query) as NodeListOf<T>;
}

export default { shadowQuery, shadowQueryAll, query, queryAll };
