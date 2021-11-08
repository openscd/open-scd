import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { busBarIcon } from '../../icons';

/**
 * SLD component of a BusBar component.
 */
@customElement('busbar-sld')
export class BusBasSld extends LitElement {
  @property()
  element!: Element;

  /**
   * True if this Bay is built up downwards.
   */
  @property()
  downer: boolean = false;

  /**
   * The 'justify-content' draws all elements within the div from bottom up ('flex-end')
   * or top down ('flex-start).
   * This depends if the busbar is drawn up or down.
   */
  render(): TemplateResult {
    return html`<div
      style="justify-content: ${this.downer ? css`flex-end;` : css`flex-start`}">
      ${this.downer ? html`<h4>${this.element.getAttribute('name')}</h4>
      ${busBarIcon}` : html`${busBarIcon}<h4>${this.element.getAttribute('name')}</h4>`}
    </div>`;
  }

  static styles = css`
    div {
      grid-template-columns: repeat(1, 1fr);
      width: 100%;
      height: 64px;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }

    div svg {
      width: 100%;
    }

    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      opacity: 1;
      transition: opacity 200ms linear;
      text-align: left;
    }
  `;
}