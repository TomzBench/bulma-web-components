import { LitElement, customElement, html, property, query } from 'lit-element';
import { directive } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';
import { Sizes, Colors } from '../field/types';
import { readAttribute } from '../../shared/attributes';

type Left = 'left';
type Right = 'right';
type Where = Left | Right;

// Helper for rendering icons
interface IconArgs {
  icon: string | undefined;
  size: Sizes | undefined;
  where: Where;
}

const renderIcon = ({ icon, size, where }: IconArgs) => {
  const classes = {
    icon: true,
    [`is-${where}`]: true,
    [`is-${size}`]: !!size
  };
  return icon
    ? html`
        <span class="${classMap(classes)}">
          <i class="material-icons">${icon}</i>
        </span>
      `
    : '';
};

// Wrap an select element with a control element
export const select = (select: HTMLSelectElement) => {
  const iconLeft =
    readAttribute(select, 'iconLeft') || readAttribute(select, 'icon');
  const iconRight = readAttribute(select, 'iconRight');
  const size = readAttribute<Sizes>(select, 'size');
  const color = readAttribute<Colors>(select, 'color');
  const theme = readAttribute(select, 'theme');
  const rounded = readAttribute<boolean>(select, 'rounded');
  const expanded = readAttribute<boolean>(select, 'expanded');
  const fullwidth = readAttribute<boolean>(select, 'fullwidth');
  const loading = readAttribute<boolean>(select, 'loading');
  const help = readAttribute(select, 'help');
  if (size) select.classList.add(`is-${size}`);
  if (color) select.classList.add(`is-${color}`);
  const classes = {
    control: {
      'has-icons-left': !!iconLeft,
      'has-icons-right': !!iconRight && !loading,
      ['is-expanded']: !!expanded,
      'is-loading': !!loading
    },
    select: {
      [`is-fullwidth`]: !!fullwidth,
      [`is-rounded`]: !!rounded,
      [`is-${color}`]: !!color,
      [`is-${size}`]: !!size
    }
  };
  return html`
    <div class="control ${classMap(classes.control)}">
      <div class="select ${classMap(classes.select)}">
        <!-- SELECT -->
        ${select}
        <!-- ICONS  -->
        ${renderIcon({ icon: iconLeft, size, where: 'left' as Left })}
        ${!loading
          ? renderIcon({ icon: iconRight, size, where: 'right' as Right })
          : ''}
      </div>
    </div>
  `;
};
