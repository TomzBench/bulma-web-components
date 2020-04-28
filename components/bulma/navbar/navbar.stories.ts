import { LitElement, customElement, html } from 'lit-element';
import { styles } from '../styles';
import './navbar';
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
      <a start>From Menu</a>
      <a start>From Menu</a>
      <a start>From Menu</a>
      <div start dropdown label="Foo">
        <div class="COMPONENT SAFE TEST">
          <div class="navbar-dropdown">
            <a class="navbar-item">Link1</a>
            <a class="navbar-item">Link2</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Link3</a>
          </div>
        </div>
      </div>
      <a end>From Menu</a>
      <div end dropdown label="With Component">
        <bulma-navbar-dropdown>
          <a>Test A</a>
          <a>Test B</a>
          <a>Test C</a>
          <hr divider></hr>
          <a>Test D</a>
        </bulma-navbar-dropdown>
      </div>
      <a end>From Menu</a>
      <a end>From Menu</a>
    </bulma-navbar>
  `.getHTML();
};
