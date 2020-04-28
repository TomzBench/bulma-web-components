import { LitElement, customElement, html } from 'lit-element';
import { styles } from '../styles';
import './input';

export default { title: 'bulma-input' };

export const inputBasic = () => {
  return html`
    <bulma-field label="hi" color="danger" size="small">
      <input icon="mail" iconRight="face" help="Please wait" />
    </bulma-field>
  `.getHTML();
};

export const inputBasicLoadingHidesRightIcon = () => {
  return html`
    <bulma-field label="hi" color="success" size="small">
      <input icon="mail" iconRight="face" help="Please wait" loading />
    </bulma-field>
  `.getHTML();
};

export const inputHasAddon = () => {
  return html`
    <bulma-field color="success" size="small" addons>
      <input icon="mail" iconRight="face" help="Please wait" loading />
      <p class="control">
        <a class="button is-info is-small">Search</a>
      </p>
    </bulma-field>
  `.getHTML();
};

export const inputExpandedHasAddon = () => {
  return html`
    <bulma-field color="success" size="small" addons>
      <input icon="mail" iconRight="face" help="Please wait" loading expanded />
      <p class="control">
        <a class="button is-info is-small">Search</a>
      </p>
    </bulma-field>
  `.getHTML();
};

export const inputGrouped = () => {
  return html`
    <bulma-field color="success" size="small" grouped>
      <input icon="mail" iconRight="face" help="Please wait" loading />
      <p class="control">
        <a class="button is-info is-small">Search</a>
      </p>
    </bulma-field>
  `.getHTML();
};

export const horizontalBasic = () => {
  return html`
    <bulma-field label="Horizontal" horizontal>
      <input help="Your name is spelled wrong" placeholder="basic" />
    </bulma-field>
  `.getHTML();
};

export const horizontalMulti = () => {
  return html`
    <bulma-field label="Horizontal" size="small" color="success" horizontal>
      <input icon="mail" help="Help me please!" loading />
      <input icon="user" help="Help me please!" loading />
      <input icon="mr" help="Help me please!" loading />
    </bulma-field>
  `.getHTML();
};

export const horizontalMultiLarge = () => {
  return html`
    <bulma-field label="Horizontal" size="large" color="success" horizontal>
      <input icon="mail" help="Help me please!" loading />
      <input icon="user" help="Help me please!" loading />
      <input icon="mr" help="Help me please!" loading />
    </bulma-field>
  `.getHTML();
};

export const horizontalAddons = () => {
  return html`
    <bulma-field label="Horizontal" size="small" color="success" horizontal>
      <bulma-field size="small" color="success" addons>
        <input icon="mail" help="Help me please!" loading expanded />
        <p class="control">
          <a class="button is-info is-small">Search</a>
        </p>
      </bulma-field>
      <bulma-field size="small" color="success" addons>
        <input icon="mail" help="Help me please!" loading expanded />
        <p class="control">
          <a class="button is-static is-small">Search</a>
        </p>
      </bulma-field>
    </bulma-field>
  `.getHTML();
};

@customElement('bulma-raw')
class BulmaRaw extends LitElement {
  static styles = styles(styles.toString());
  render() {
    return html`
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Label</label>
        </div>
        <div class="field-body">
          <div class="control">
            <input class="input" />
            <p class="help">Your name is spelled wrong</p>
          </div>
        </div>
      </div>
    `;
  }
}
export const raw = () => {
  return html`
    <bulma-raw></bulma-raw>
  `.getHTML();
};
