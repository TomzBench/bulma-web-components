import { html } from 'lit-element';
import { AtxFormLogin } from './form-login';
import './form-login.ts';

export default { title: 'atx-form-login' };

export const basic = () => {
  let form = new AtxFormLogin();
  return form;
};
