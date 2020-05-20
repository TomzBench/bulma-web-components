import { html, TemplateResult } from 'lit-element';
import { AtxModalFormUser } from './modal-form-user';
import './modal-form-user';

export default { title: 'atx-modal-login' };

export const basic = () => {
  let div = document.createElement('div');
  let modal = document.createElement('atx-modal-login') as AtxModalFormUser;
  let button = document.createElement('button');
  button.innerText = 'Click me';
  button.addEventListener('click', () => {
    modal.show = true;
  });
  div.appendChild(modal);
  div.appendChild(button);
  return div;
};
