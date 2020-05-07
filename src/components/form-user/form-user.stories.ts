import { html } from 'lit-element';
import { AtxFormUser } from './form-user';
import './form-user';

export default { title: 'atx-form-user' };

export const basic = () => {
  let form = new AtxFormUser();
  return form;
};
