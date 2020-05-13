import 'reflect-metadata';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Container } from 'inversify';
import { SYMBOLS } from '../../../ioc/constants.root';
import { LitElement, customElement } from 'lit-element';
import {
  makeDecorators,
  DomInjectEvent,
  DomPropertyMetadata,
  domProvider,
  METADATA_KEYS
} from '../../../components/shared/decorators';
import { ServiceIdentifier } from '../../../components/shared/types';

import '../home';
import { UserService } from '../../../services/user/user.service';
import { RouterService } from '../../../services/router/router.service';
import { IoService } from '../../../services/io/io.service';
import { AtxTopnav } from '../../../components/topnav/topnav';
import { SubmitLoginEvent } from '../../../components/form-login/types';
import sinon from 'sinon';

function shadowQuery(el: Element | null, query: string) {
  expect(el).instanceof(Element);
  return ((el as Element).shadowRoot as ShadowRoot).querySelector(query);
}

function shadowQueryAll(el: Element | null, query: string) {
  expect(el).instanceof(Element);
  return ((el as Element).shadowRoot as ShadowRoot).querySelectorAll(query);
}

function query(el: Element | null, query: string) {
  expect(el).instanceof(Element);
  return (el as Element).querySelector(query);
}

function queryAll(el: Element | null, query: string) {
  expect(el).instanceof(Element);
  return (el as Element).querySelectorAll(query);
}

async function setup(name: string) {
  let container = new Container();
  let users = new UserService({} as IoService);
  let router = new RouterService({} as any);
  let usersMock = sinon.mock(users);
  let routerMock = sinon.mock(router);
  container.bind(SYMBOLS.USER_SERVICE).toDynamicValue(() => users);
  container.bind(SYMBOLS.ROUTER_SERVICE).toDynamicValue(() => router);
  @domProvider(`provider-${name}`, container)
  class Provider extends LitElement {}
  return {
    users,
    usersMock,
    routerMock,
    test: await fixture(
      `<provider-${name}><atx-home></atx-home></provider-${name}>`
    )
  };
}

describe('home', () => {
  it('Should login', async () => {
    // Setup
    const { test, users, usersMock, routerMock } = await setup('login');
    let shadowRoot = test.shadowRoot as ShadowRoot;
    let home = query(test, 'atx-home') as LitElement;
    let topnav: AtxTopnav = shadowQuery(home, 'atx-topnav') as AtxTopnav;

    // Test
    usersMock
      .expects('login')
      .once()
      .returns(new Promise(resolve => resolve({ accessToken: 'foo' })))
      .calledWith('foo-email', 'foo-password');
    routerMock
      .expects('route')
      .once()
      .calledWith('/dashboard');

    topnav.dispatchEvent(
      new CustomEvent<SubmitLoginEvent>('atx-login', {
        bubbles: true,
        composed: true,
        detail: { email: 'foo-email', password: 'foo-password' }
      })
    );
    await home.requestUpdate();
    usersMock.verify();
    routerMock.verify();
  });
});
