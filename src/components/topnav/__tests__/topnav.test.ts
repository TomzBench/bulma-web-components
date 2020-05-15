import 'reflect-metadata';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Container } from 'inversify';
import { SYMBOLS } from '../../../ioc/constants.root';
import { LitElement, customElement } from 'lit-element';
import { domProvider } from '../../../components/shared/decorators';
import { ServiceIdentifier } from '../../../components/shared/types';
import {
  shadowQuery,
  shadowQueryAll,
  query,
  queryAll
} from '../../../__tests__/__helpers__/helpers';

import '../topnav';
import { UserService } from '../../../services/user/user.service';
import { RouterService } from '../../../services/router/router.service';
import { IoService } from '../../../services/io/io.service';
import { AtxTopnav } from '../../../components/topnav/topnav';
import { SubmitLoginEvent } from '../../../components/form-login/types';
import sinon from 'sinon';

async function setup(name: string) {
  let container = new Container();
  let ioService = new IoService({} as any);
  sinon.stub(ioService, 'get').returns(new Promise(resolve => resolve()));
  sinon.stub(ioService, 'setHeader');
  let users = new UserService(ioService);
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
      `<provider-${name}><atx-topnav></atx-topnav></provider-${name}>`
    )
  };
}

describe('topnav', () => {
  it('Should login', async () => {
    // Setup
    const { test, users, usersMock, routerMock } = await setup('login');
    let shadowRoot = test.shadowRoot as ShadowRoot;
    let topnav = query(test, 'atx-topnav') as LitElement;
    let login = shadowQuery(topnav, 'atx-modal-login') as Element;

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

    login.dispatchEvent(
      new CustomEvent<SubmitLoginEvent>('atx-login', {
        bubbles: true,
        composed: true,
        detail: { email: 'foo-email', password: 'foo-password' }
      })
    );
    await topnav.requestUpdate();
    usersMock.verify();
    routerMock.verify();
  });
});
