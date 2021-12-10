import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './accesspoint-container.js';

/** [[`IED Container`]] plugin subeditor for editing `IED` sections. */
@customElement('ied-container')
export class IedContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc') ?? '';

    return `${name} ${desc ? `- ${desc}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
      ${Array.from(this.element.querySelectorAll('AccessPoint')).map(
        ap => html`<access-point-container
          .element=${ap}
        ></access-point-container>`)}
      </action-pane>`;
  }

  static styles = css``;
}
