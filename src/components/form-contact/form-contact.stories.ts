import { html } from 'lit-element';
import { AtxFormContact } from './form-contact';
import './form-contact';

export default { title: 'atx-form-contact' };

export const basic = () => {
  let form = new AtxFormContact();
  return form;
};
