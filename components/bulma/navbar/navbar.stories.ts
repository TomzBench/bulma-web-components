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
        logo
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
      />
      <a start class="navbar-item">Test</a>
      <div start class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">DropDown</a>
        <div class="navbar-dropdown">
          <a class="navbar-item">Selection</a>
          <a class="navbar-item">Selection</a>
          <hr class="navbar-divider" />
          <a class="navbar-item">Selection</a>
        </div>
      </div>
      <a class="navbar-item" end>Test</a>
      <bulma-navbar-item start label="First"></bulma-navbar-item>
      <bulma-navbar-item start label="Dropdown" dropdown>
        <bulma-navbar-item label="Selection A"></bulma-navbar-item>
        <bulma-navbar-item label="Selection B"></bulma-navbar-item>
        <bulma-navbar-item label="Selection C"></bulma-navbar-item>
      </bulma-navbar-item>
    </bulma-navbar>
  `.getHTML();
};
