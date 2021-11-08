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

  render(): TemplateResult {
    return html`<div>
      ${this.downer ? html`<h4>${this.element.getAttribute('name')}</h4>
      ${busBarIcon}` : html`${busBarIcon}<h4>${this.element.getAttribute('name')}</h4>`}
    </div>`;
  }

  /**
   * TODO: Always assumes going down.
   * justify-content: flex-end; draws everything at bottom.
   * justify-content: flex-start; draws everything on top. 
   */
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