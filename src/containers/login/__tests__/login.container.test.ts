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

import { UserService } from '../../../services/user/user.service';
import { RouterService } from '../../../services/router/router.service';
import { IoService } from '../../../services/io/io.service';
import {
  SubmitLoginEvent,
  SubmitLogoutEvent
} from '../../../components/form-login/types';
import sinon from 'sinon';

import '../login.container';

async function setup(name: string) {
  let container = new Container();
  let ioService = new IoService({} as any);
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
      `<provider-${name}>
        <atx-login-container>
          <div class="alertable"></div>
        </atx-login-container>
      </provider-${name}>`
    )
  };
}

describe('login.container', () => {
  it('Should login', async () => {
    // Setup
    const { test, users, usersMock, routerMock } = await setup('login');
    let container = query<LitElement>(test, 'atx-login-container');
    let alertable = query(container, '.alertable') as HTMLElement;

    // Test
    usersMock
      .expects('login')
      .withArgs('foo-email', 'foo-password')
      .returns(new Promise(resolve => resolve({ accessToken: 'foo' })));
    routerMock.expects('route').withArgs('/foologin');

    alertable.dispatchEvent(
      new CustomEvent<SubmitLoginEvent>('atx-login', {
        bubbles: true,
        composed: true,
        detail: {
          email: 'foo-email',
          password: 'foo-password',
          redirect: '/foologin'
        }
      })
    );
    await container.requestUpdate();
    usersMock.verify();
    routerMock.verify();
  });

  it('Should logout', async () => {
    // Setup
    const { test, users, usersMock, routerMock } = await setup('logout');
    let container = query<LitElement>(test, 'atx-login-container');
    let alertable = query(container, '.alertable') as HTMLElement;

    // Test
    usersMock
      .expects('logout')
      .withArgs()
      .returns(new Promise(resolve => resolve({ accessToken: 'foo' })));
    routerMock.expects('route').withArgs('/foologout');

    alertable.dispatchEvent(
      new CustomEvent<SubmitLogoutEvent>('atx-logout', {
        bubbles: true,
        composed: true,
        detail: { redirect: '/foologout' }
      })
    );
    await container.requestUpdate();
    usersMock.verify();
    routerMock.verify();
  });
});
