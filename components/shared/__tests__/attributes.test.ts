import { html } from 'lit-element';
import { readAttribute, makeAttribute, setAttribute } from '../attributes';

type Sizes = 'small' | 'medium' | 'large';
interface Attributes {
  foo: boolean;
  bar: string;
  size: Sizes;
  loading: boolean;
}

test('readAttribute should read attributes', () => {
  let el = document.createElement('input');
  setAttribute(el, makeAttribute('foo'));
  setAttribute(el, makeAttribute('bar', 'baz'));
  setAttribute(el, makeAttribute('size', 'small'));
  setAttribute(el, makeAttribute('loading'));
  let foo: boolean | undefined = readAttribute<boolean>(el, 'foo');
  let bar: string | undefined = readAttribute(el, 'bar');
  let size: Sizes | undefined = readAttribute(el, 'size');
  let loading: boolean | undefined = readAttribute<boolean>(el, 'loading');
  expect(foo).toBeTruthy();
  expect(bar).toBe('baz');
  expect(size).toBe('small');
  expect(loading).toBe(true);
});
