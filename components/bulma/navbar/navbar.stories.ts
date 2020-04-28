import { LitElement, customElement, html } from 'lit-element';
import { styles } from '../styles';
import './navbar';
import './navbar-item';
import '../field/field';

export default { title: 'bulma-navbar' };

export const navbarBasic = () => {
  return html`
    <bulma-navbar color="primary">
      <img
        slot="logo"
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
      />
      <bulma-navbar-item start label="First"></bulma-navbar-item>
      <bulma-navbar-item start label="Dropdown" dropdown>
        <bulma-navbar-item label="Selection A"></bulma-navbar-item>
        <bulma-navbar-item label="Selection B"></bulma-navbar-item>
        <bulma-navbar-item label="Selection C"></bulma-navbar-item>
      </bulma-navbar-item>
    </bulma-navbar>
  `.getHTML();
};
