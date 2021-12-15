import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './access-point-container.js';
import { IEDSelector } from './foundation.js';

/** [[`IED Container`]] plugin subcontainer for editing `IED` sections. */
@customElement('ied-container')
export class IedContainer extends LitElement {
  /** The edited `Element`, a common property of all IED subcontainers. */
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc') ?? '';

    return `${name} ${desc ? `\u2014 ${desc}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
      ${Array.from(this.element.querySelectorAll(IEDSelector.AccessPoint)).map(
        ap => html`<access-point-container
          .element=${ap}
          ?readonly=${this.readonly}
        ></access-point-container>`)}
      </action-pane>`;
  }

  static styles = css``;
}
