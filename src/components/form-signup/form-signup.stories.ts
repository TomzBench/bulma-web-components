import { html } from 'lit-element';
import { AtxFormSignup } from './form-signup';
import './form-signup.ts';

export default { title: 'atx-form-signup' };

export const basic = () => {
  let form = new AtxFormSignup();
  return form;
};
