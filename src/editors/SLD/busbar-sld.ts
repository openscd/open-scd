import {
  css,
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

  render(): TemplateResult {
    return html`<div class="busbar">
      <h4>${this.element.getAttribute('name')}</h4>
      ${busBarIcon}
    </div>`;
  }

  static styles = css`
    .busbar {
      grid-template-columns: repeat(1, 1fr);
    }

    .busbar svg {
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
