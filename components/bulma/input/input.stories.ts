import { html } from 'lit-element';
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
