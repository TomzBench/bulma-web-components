import { html } from 'lit-element';
import './toast';

export default { title: 'atx-toast' };

export const bottomLeft = () => {
  return html`
    <div>
      <atx-toast-container position="bottom-left">
        <atx-toast light color="info">
          This is a test message
        </atx-toast>
      </atx-toast-container>
    </div>
  `.getHTML();
};

export const bottomRight = () => {
  return html`
    <div>
      <atx-toast-container position="bottom-right">
        <atx-toast light color="info">
          This is a test message
        </atx-toast>
      </atx-toast-container>
    </div>
  `.getHTML();
};
