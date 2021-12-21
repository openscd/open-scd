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
import { getDescriptionAttribute, getNameAttribute } from '../../foundation.js';
import './access-point-container.js';

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('ied-container')
export class IedContainer extends LitElement {
  /** The edited `Element`, a common property of all IED subcontainers. */
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      ${Array.from(this.element.querySelectorAll(':scope > AccessPoint')).map(
        ap => html`<access-point-container
          .element=${ap}
        ></access-point-container>`)}
      </action-pane>`;
  }

  static styles = css``;
}
