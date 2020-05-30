import { LitElement, customElement, html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import { d3 } from '../../services/d3/d3';
import * as scss from './chart.styles.scss';

@customElement('atx-chart')
export class AtxChart<D> extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: Number }) height: number = 400;
  @property({ type: Number }) width: number = 400;
  @property({ type: Array }) data: D[] = [];
  @property({ type: Function }) xAccessor!: (d: D) => number;
  @property({ type: Function }) yAccessor!: (d: D) => number;
  @query('#chart') chart!: HTMLElement;

  firstUpdated() {
    const margins = { top: 60, right: 60, bottom: 60, left: 60 };

    // prettier-ignore
    const svg = d3
      .select(this.chart)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    // prettier-ignore
    const bounds = svg
      .append('g')
        .style('transform', `translate(${margins.left}px,${margins.top}px)`);
  }

  render() {
    return html`
      <div id="chart"></div>
    `;
  }
}
