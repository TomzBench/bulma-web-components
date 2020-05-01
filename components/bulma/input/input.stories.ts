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
    <b-field label="With Icons">
      <b-input>
        <b-icon where="left">mail</b-icon>
      </b-input>
    </b-field>
  `.getHTML();
};

export const withHelp = () => {
  return html`
    <b-field label="With Help">
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

export const withAddon = () => {
  return html`
    <b-field label="With Addon">
      <b-addon color="info">FOO</b-addon>
      <b-input placeholder="addons">
        <b-icon where="left">mail</b-icon>
      </b-input>
      <b-addon static color="info">@gmail.com</b-addon>
    </b-field>
  `.getHTML();
};

export const withAddonFieldMods = () => {
  return html`
    <b-field label="Field Mods" color="success" size="small">
      <b-addon>FOO</b-addon>
      <b-input placeholder="addons">
        <b-icon where="left">mail</b-icon>
      </b-input>
      <b-addon static color="info">@gmail.com</b-addon>
    </b-field>
  `.getHTML();
};

export const withAddonFieldModsMultiColor = () => {
  return html`
    <b-field label="Field Mods Expanded" color="success" size="small">
      <b-addon color="info">FOO</b-addon>
      <b-input placeholder="addons">
        <b-icon where="left">mail</b-icon>
      </b-input>
      <b-addon static color="info">@gmail.com</b-addon>
    </b-field>
  `.getHTML();
};

export const withAddonFieldModsExpanded = () => {
  return html`
    <b-field label="Field Mods Expanded" color="success" size="small">
      <b-addon color="info">FOO</b-addon>
      <b-input expanded placeholder="addons">
        <b-icon where="left">mail</b-icon>
      </b-input>
      <b-addon static color="info">@gmail.com</b-addon>
    </b-field>
  `.getHTML();
};

export const withGrouped = () => {
  return html`
    <b-field label="Grouped" grouped>
      <b-addon color="info">FOO</b-addon>
      <b-input placeholder="addons">
        <b-icon where="left">mail</b-icon>
      </b-input>
      <b-addon static color="info">@gmail.com</b-addon>
      <b-input placeholder="email">
        <b-icon where="left">account_circle</b-icon>
      </b-input>
    </b-field>
  `.getHTML();
};
