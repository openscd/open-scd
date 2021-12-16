import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';

import '../../action-pane.js';
import './access-point-container.js';
import { IEDSelector } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('ied-container')
export class IedContainer extends LitElement {
  /** The edited `Element`, a common property of all IED subcontainers. */
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    const name = this.element.getAttribute('name');
    const desc = this.element.getAttribute('desc');

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      ${Array.from(this.element.querySelectorAll(IEDSelector.AccessPoint)).map(
        ap => html`<access-point-container
          .element=${ap}
        ></access-point-container>`)}
      </action-pane>`;
  }

  static styles = css``;
}
