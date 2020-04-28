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
      <a start class="navbar-item">From Menu</a>
      <a start class="navbar-item">From Menu</a>
      <a start class="navbar-item">From Menu</a>
      <div start class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">Dropdown</a>
        <div>
          <div class="navbar-dropdown">
            <a class="navbar-item">Link1</a>
            <a class="navbar-item">Link2</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Link3</a>
          </div>
        </div>
      </div>
      <a end class="navbar-item">From Menu</a>
      <a end class="navbar-item">From Menu</a>
      <a end class="navbar-item">From Menu</a>
    </bulma-navbar>
  `.getHTML();
};
