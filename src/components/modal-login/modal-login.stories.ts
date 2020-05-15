import { html, TemplateResult } from 'lit-element';
import { AtxModalLogin } from './modal-login';
import './modal-login';

export default { title: 'atx-modal-login' };

export const basic = () => {
  let div = document.createElement('div');
  let modal = document.createElement('atx-modal-login') as AtxModalLogin;
  let button = document.createElement('button');
  button.innerText = 'Click me';
  button.addEventListener('click', () => {
    modal.show();
  });
  div.appendChild(modal);
  div.appendChild(button);
  return div;
};
