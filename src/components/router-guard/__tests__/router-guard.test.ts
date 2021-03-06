import 'reflect-metadata';
import { html, fixture, elementUpdated, expect } from '@open-wc/testing';
import { Container } from 'inversify';
import { SYMBOLS } from '../../../ioc/constants.root';
import { LitElement, customElement } from 'lit-element';
import { domProvider } from '../../../components/shared/decorators';
import {
  shadowQuery,
  shadowQueryAll,
  query,
  queryAll
} from '../../../__tests__/__helpers__/helpers';

import '../router-guard';
import { UserService } from '../../../services/user/user.service';
import { RouterService } from '../../../services/router/router.service';
import { IoService } from '../../../services/io/io.service';

import sinon from 'sinon';

async function setup(name: string, role: number) {
  const ready = new Promise(resolve => resolve());
  const users = { user: { value: { role } }, ready };
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
    let clock = sinon.useFakeTimers();
    const { Provider, users, routerMock } = await setup('testa', 2);
    routerMock.expects('route').calledWith('/fooey');
    const test = await fixture(`
      <provider-testa>
        <atx-router-guard transition="1000" role="0" redirect="/fooey">
        </atx-router-guard>
      </provider-testa>
      `);
    let guard = query<LitElement>(test, 'atx-router-guard') as LitElement;
    clock.tick(1000);
    await elementUpdated(guard);
    let button = shadowQuery<HTMLButtonElement>(guard, 'button');
    button.click();
    await guard.requestUpdate();
    routerMock.verify();
    clock.restore();
  });

  it('Should not redirect', async () => {
    let clock = sinon.useFakeTimers();
    const { Provider, users, routerMock } = await setup('testb', 2);
    routerMock.expects('route').notCalled;
    const test = await fixture(`
      <provider-testb>
        <atx-router-guard transition="1000" role="2" redirect="/fooey">
        </atx-router-guard>
      </provider-testb>
      `);
    let guard = query<LitElement>(test, 'atx-router-guard');
    clock.tick(1000);
    await elementUpdated(guard);
    let button = shadowQuery<HTMLButtonElement>(guard, 'button');
    button.click();
    await guard.requestUpdate();
    routerMock.verify();
    clock.restore();
  });
});
