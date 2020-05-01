import { html } from 'lit-element';
import '../field/field';
import '../icon/icon';
import '../addon/addon';
import './input';

export default { title: 'b-input' };

export const basic = () => {
  return html`
    <b-field label="Basic">
      <b-input placeholder="basic"></b-input>
    </b-field>
  `.getHTML();
};

export const withIcons = () => {
  return html`
    <b-field label="foo">
      <b-input>
        <b-icon where="left">mail</b-icon>
      </b-input>
    </b-field>
  `.getHTML();
};

export const withHelp = () => {
  return html`
    <b-field>
      <b-input
        placeholder="foo"
        help="Your name is spelled wrong"
        color="danger"
      >
        <b-icon where="left">account_circle</b-icon>
      </b-input>
    </b-field>
  `.getHTML();
};

/*
export const withGrouped = () => {
  return html`
    <b-field>
      <b-input>
        <span class="icon is-left"><i class="material-icons">mail</i></span>
      </b-input>
    </b-field>
  `.getHTML();
};

*/
export const withAddon = () => {
  return html`
    <b-field>
      <b-input>
        <b-icon where="left">mail</b-icon>
        <b-addon color="info">FOO</b-addon>
      </b-input>
    </b-field>
  `.getHTML();
};
