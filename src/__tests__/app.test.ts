import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Container } from 'inversify';
import { LitElement, customElement } from 'lit-element';
import {
  makeDecorators,
  DomInjectEvent,
  DomPropertyMetadata,
  METADATA_KEYS
} from '../components/shared/decorators';
import { ServiceIdentifier } from '../components/shared/types';

import '../app';
import { UserService } from '../services/user/user.service';
import { AtxTopnav } from '../components/topnav/topnav';
import { SubmitLoginEvent } from '../components/form-login/types';
import sinon from 'sinon';

describe('app', () => {
  it('Should login', async () => {
    let test = await fixture('<atx-app></atx-app>');
    let shadowRoot = test.shadowRoot as ShadowRoot;
    let topnav: AtxTopnav = shadowRoot.querySelector('atx-topnav') as AtxTopnav;
    topnav.dispatchEvent(
      new CustomEvent<SubmitLoginEvent>('atx-login', {
        bubbles: true,
        composed: true,
        detail: { email: 'foo-email', password: 'foo-password' }
      })
    );
  });
});
