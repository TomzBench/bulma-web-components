import 'reflect-metadata';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Container } from 'inversify';
import { SYMBOLS } from '../../../ioc/constants.root';
import { LitElement, customElement } from 'lit-element';
import { domProvider } from '../../../components/shared/decorators';

import '../router-guard';
import { UserService } from '../../../services/user/user.service';
import { RouterService } from '../../../services/router/router.service';
import { IoService } from '../../../services/io/io.service';

import sinon from 'sinon';

async function setup(name: string, role: number) {
  const users = { user: { value: { role } } };
  const router = { route: () => {} };
  let container = new Container();
  container.bind(SYMBOLS.USER_SERVICE).toDynamicValue(() => users);
  container.bind(SYMBOLS.ROUTER_SERVICE).toDynamicValue(() => router);
  @domProvider(`provider-${name}`, container)
  class Provider extends LitElement {}
  let routerMock = sinon.mock(router);
  return {
    users,
    router,
    routerMock,
    Provider
  };
}

describe('router-guard', () => {
  it('Should redirect', async () => {
    const { Provider, users, routerMock } = await setup('testa', 2);
    routerMock.expects('route').calledWith('/fooey');
    const test = await fixture(`
      <provider-testa>
        <atx-router-guard role="0" redirect="/fooey">
        </atx-router-guard>
      </provider-testa>
      `);
    let guard = test.querySelector('atx-router-guard') as LitElement;
    // await guard.requestUpdate();
    routerMock.verify();
  });

  it('Should not redirect', async done => {
    done();
  });
});
