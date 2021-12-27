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

/** [[`IED`]] plugin subeditor for editing `DO` element. */
@customElement('do-container')
export class DOContainer extends LitElement {
  /**
   * The DO itself.
   */
  @property({ attribute: false })
  element!: Element;

  /**
   * The optional DOI of this DO.
   */
  @property({ attribute: false })
  instanceElement!: Element;

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    if (this.instanceElement != null) {
      return html`<b>${name}${desc ? html` &mdash; ${desc}` : nothing}</b>`;
    } else {
      return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
    }
  }

  /**
   * Get the nested SDO element(s).
   * @returns The nested SDO element(s) of this DO container.
   */
  private getDOElements(): Element[] {
    const type = this.element.getAttribute('type') ?? undefined;
    const doType =  this.element.closest('SCL')!.querySelector(`:root > DataTypeTemplates > DOType[id="${type}"]`);
    if (doType != null) {
      return Array.from(doType!.querySelectorAll(':scope > SDO'))
    }
    return [];
  }

  /**
   * Get the instance element (SDI) of a SDO element (if available)
   * @param sdo - The SDO object to search with.
   * @returns The optional SDI element.
   */
  private getInstanceElement(sdo: Element): Element | null {
    const sdoName = getNameAttribute(sdo);
    if (this.instanceElement) {
      return this.instanceElement.querySelector(`:scope > SDI[name="${sdoName}"]`)
    }
    return null;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}" icon="${this.instanceElement != null ? 'done' : ''}">
      ${this.getDOElements().map(dO =>
        html`<do-container
          .element=${dO}
          .instanceElement=${this.getInstanceElement(dO)}>
        </do-container>`)}
    </action-pane>
    `;
  }
}