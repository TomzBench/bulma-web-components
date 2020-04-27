import { LitElement, customElement, html, property, query } from 'lit-element';
import { directive } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';
import { Sizes, Colors } from '../field/types';
import { readAttribute } from '../../shared/attributes';

// Node Binding               IE: ${dir()}
// boolean attribute binding: IE: <p ${dir()}></p>
// attribute binding          IE: <p attr=${dir()}></p>
// property binding           IE: <p .prop=${dir()}></p>
// Event binding              IE: <p @click=${dir()}></p>

type Left = 'left';
type Right = 'right';
type Where = Left | Right;

// Helper for rendering help
interface HelpArgs {
  help: string | undefined;
  color: Colors | undefined;
}

const renderHelp = ({ help, color }: HelpArgs) => {
  const classes = { help: true, [`is-${color}`]: !!color };
  return help
    ? html`
        <p class="${classMap(classes)}">${help}</p>
      `
    : '';
};

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

// Wrap an input element with a control element
export const input = (input: HTMLInputElement) => {
  const iconLeft =
    readAttribute(input, 'iconLeft') || readAttribute(input, 'icon');
  const iconRight = readAttribute(input, 'iconRight');
  const size = readAttribute<Sizes>(input, 'size');
  const color = readAttribute<Colors>(input, 'color');
  const theme = readAttribute(input, 'theme');
  const loading = readAttribute<boolean>(input, 'loading');
  const help = readAttribute(input, 'help');
  input.classList.add('input');
  if (size) input.classList.add(`is-${size}`);
  if (color) input.classList.add(`is-${color}`);
  const classes = {
    control: true,
    [`is-${size}`]: !!size,
    'has-icons-left': !!iconLeft,
    'has-icons-right': !!iconRight && !loading,
    'is-loading': !!loading
  };
  console.log(color);
  console.log(size);
  console.log(classes);
  return html`
    <div class="${classMap(classes)}">
      <!-- INPUT -->
      ${input}
      <!-- ICONS  -->
      ${renderIcon({ icon: iconLeft, size, where: 'left' as Left })}
      ${!loading
        ? renderIcon({ icon: iconRight, size, where: 'right' as Right })
        : ''}
      <!-- HELP -->
      ${renderHelp({ help, color })}
    </div>
  `;
};
