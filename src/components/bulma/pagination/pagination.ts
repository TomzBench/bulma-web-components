import { LitElement, customElement, html, property } from 'lit-element';
import { readAttribute, writeAttribute } from '../../shared/attributes';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';

import { Colors, Sizes, NavbarWhere } from '../bulma-types';

import * as scss from './pagination.styles.scss';

type Events = 'prev' | 'next';

@customElement('b-pagination')
export class BPagination extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: Number }) total: number = 0;
  @property({ type: Boolean }) simple: boolean = false;
  @property({ type: String }) size?: Sizes;
  @property({ type: Number, attribute: 'per-page' }) perPage: number = 0;
  @property({ type: Number, attribute: 'buttons-after' })
  buttonsAfter: number = 3;
  @property({ type: Number, attribute: 'buttons-before' })
  buttonsBefore: number = 3;

  _current: number = 1;
  @property({ type: Number })
  get current(): number {
    return this._current;
  }
  set current(val: number) {
    const old = this.current;
    if (val >= 1 && val * this.perPage + 1 - this.perPage <= this.total) {
      this._current = val;
      this.requestUpdate('current', old);
    }
  }

  prev() {}

  next() {}

  emit(event: Events) {
    let ev = new CustomEvent(`b-${event}`, {
      bubbles: true,
      composed: true,
      detail: { current: this.current + 1 }
    });
    this.dispatchEvent(ev);
  }

  render() {
    const classes = { [`is-${this.size}`]: !!this.size };
    const pageCount = Math.ceil(this.total / this.perPage);
    let firstItem = this.current * this.perPage - this.perPage + 1;
    if (firstItem < 0) firstItem = 0;
    return html`
      <div class="pagination ${classMap(classes)}">
        <a class="pagination-previous" @click=${() => this.emit('prev')}>
          Previous
        </a>
        <a class="pagination-previous" @click=${() => this.emit('next')}>
          Next page
        </a>
        ${this.simple
          ? this.perPage === 1
            ? html`
                <small class="is-simple">${firstItem} / ${this.total}</small>
              `
            : html`
                <small class="is-simple">
                  ${firstItem} -
                  ${Math.min(this.current * this.perPage, this.total)} /
                  ${this.total}
                </small>
              `
          : html`
              <ul class="pagination-list">
                <li><a class="pagination-link">1</a></li>
                <li><a class="pagination-link">2</a></li>
                <li><a class="pagination-link">3</a></li>
                <li><a class="pagination-ellipse">&hellip;</a></li>
                <li><a class="pagination-link">${this.current}</a></li>
                <li><a class="pagination-link">11</a></li>
                <li><a class="pagination-link">12</a></li>
                <li><a class="pagination-ellipse">&hellip;</a></li>
                <li><a class="pagination-link">100</a></li>
                <li><a class="pagination-link">101</a></li>
                <li><a class="pagination-link">102</a></li>
              </ul>
            `}
      </div>
    `;
  }
}
