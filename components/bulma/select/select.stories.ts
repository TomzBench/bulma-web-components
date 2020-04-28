import { html } from 'lit-element';
import './select';

export default { title: 'bulma-select' };

export const selectBasic = () => {
  return html`
    <bulma-field label="hi" color="danger" size="small">
      <select icon="mail" help="Please wait">
        <option>hello</option>
        <option>goodby</option>
      </select>
    </bulma-field>
  `.getHTML();
};

export const selectBasicLoadingHidesRightIcon = () => {
  return html`
    <bulma-field label="hi" color="success" size="small">
      <select icon="mail" help="Please wait">
        <option>1</option>
        <option>2</option>
      </select>
    </bulma-field>
  `.getHTML();
};

export const selectHasAddon = () => {
  return html`
    <bulma-field color="success" size="small" addons>
      <select icon="mail" help="Please wait">
        <option>1</option>
        <option>2</option>
      </select>
      <p class="control">
        <a class="button is-info is-small">Search</a>
      </p>
    </bulma-field>
  `.getHTML();
};

export const selectExpandedHasAddon = () => {
  return html`
    <bulma-field color="success" size="small" addons>
      <select icon="mail" help="Please wait" fullwidth expanded>
        <option>1</option>
        <option>2</option>
      </select>
      <p class="control">
        <a class="button is-info is-small">Search</a>
      </p>
    </bulma-field>
  `.getHTML();
};

export const selectGrouped = () => {
  return html`
    <bulma-field color="success" size="small" grouped>
      <select icon="mail" help="Please wait">
        <option>1</option>
        <option>2</option>
      </select>
      <p class="control">
        <a class="button is-info is-small">Search</a>
      </p>
    </bulma-field>
  `.getHTML();
};

export const horizontalBasic = () => {
  return html`
    <bulma-field label="Horizontal" size="small" color="success" horizontal>
      <select icon="mail" help="Help me please!" fullwidth>
        <option>1</option>
        <option>2</option>
      </select>
    </bulma-field>
  `.getHTML();
};

export const horizontalMulti = () => {
  return html`
    <bulma-field label="Horizontal" size="small" color="success" horizontal>
      <select icon="mail" help="Help me please!" fullwidth>
        <option>1</option>
        <option>2</option>
      </select>
      <select icon="user" help="Help me please!" fullwidth>
        <option>1</option>
        <option>2</option>
      </select>
      <select icon="mr" help="Help me please!" fullwidth>
        <option>1</option>
        <option>2</option>
      </select>
    </bulma-field>
  `.getHTML();
};

export const horizontalMultiLarge = () => {
  return html`
    <bulma-field label="Horizontal" size="large" color="success" horizontal>
      <select icon="mail" help="Help me please!" fullwidth>
        <option>1</option>
        <option>2</option>
      </select>
      <select icon="user" help="Help me please!" fullwidth>
        <option>1</option>
        <option>2</option>
      </select>
      <select icon="mr" help="Help me please!" fullwidth>
        <option>1</option>
        <option>2</option>
      </select>
    </bulma-field>
  `.getHTML();
};

export const horizontalAddons = () => {
  return html`
    <bulma-field label="Horizontal" size="small" color="success" horizontal>
      <bulma-field size="small" color="success" addons>
        <select icon="mail" help="Help me please!" fullwidth expanded>
          <option>1</option>
          <option>2</option>
        </select>
        <p class="control">
          <a class="button is-info is-small">Search</a>
        </p>
      </bulma-field>
      <bulma-field size="small" color="success" addons>
        <select icon="mail" help="Help me please!" fullwidth expanded>
          <option>1</option>
          <option>2</option>
        </select>
        <p class="control">
          <a class="button is-static is-small">Search</a>
        </p>
      </bulma-field>
    </bulma-field>
  `.getHTML();
};
