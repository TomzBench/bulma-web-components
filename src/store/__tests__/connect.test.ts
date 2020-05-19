import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { LitElement, customElement } from 'lit-element';
import { connect } from '../connect';
import { Store, Unsubscribe, createStore } from 'redux';

describe('connect', () => {
  it('should add properties', () => {
    const store = createStore(() => {});
    @customElement('foo-el')
    class Foo extends connect(store)(LitElement) {}

    let foo = document.createElement('foo-el') as Foo;
    foo.stateChanged();
  });
});
