import { html, TemplateResult } from 'lit-element';
import { AtxModalMessage } from './modal-message';
import './modal-message';

export default { title: 'atx-modal-message' };

export const info = () => {
  let div = document.createElement('div');
  let modal = document.createElement('atx-modal-message') as AtxModalMessage;
  let button = document.createElement('button');
  button.innerText = 'Click me';
  button.addEventListener('click', () => {
    modal.show = true;
  });
  modal.type = 'info';
  modal.message = 'info message here';
  div.appendChild(modal);
  div.appendChild(button);
  return div;
};

export const warning = () => {
  let div = document.createElement('div');
  let modal = document.createElement('atx-modal-message') as AtxModalMessage;
  let button = document.createElement('button');
  button.innerText = 'Click me';
  button.addEventListener('click', () => {
    modal.show = true;
  });
  modal.type = 'warning';
  modal.message = 'warning message here';
  div.appendChild(modal);
  div.appendChild(button);
  return div;
};

export const danger = () => {
  let div = document.createElement('div');
  let modal = document.createElement('atx-modal-message') as AtxModalMessage;
  let button = document.createElement('button');
  button.innerText = 'Click me';
  button.addEventListener('click', () => {
    modal.show = true;
  });
  modal.type = 'danger';
  modal.message = 'danger message here';
  div.appendChild(modal);
  div.appendChild(button);
  return div;
};

export const withChildren = () => {
  let div = document.createElement('div');
  let modal = document.createElement('atx-modal-message') as AtxModalMessage;
  let button = document.createElement('button');
  let h1 = document.createElement('h1');
  let p = document.createElement('p');
  h1.innerText = 'Title';
  p.innerText = 'Paragraph';
  button.innerText = 'Click me';
  button.addEventListener('click', () => {
    modal.show = true;
  });
  modal.type = 'danger';
  div.appendChild(modal);
  div.appendChild(button);
  modal.appendChild(h1);
  modal.appendChild(p);
  return div;
};
