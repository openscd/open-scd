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
   * Get the DOType of a certain DO.
   * @param doType - The type of a certain DO.
   * @returns The DOType section for a specific DO.
   */
   private getDOType(dO: Element): Element | null {
    const doType = dO.getAttribute('type') ?? undefined;
    return this.element.closest('SCL')!.querySelector(`:root > DataTypeTemplates > DOType[id="${doType}"]`);
  }

  /**
   * Get the nested SDO elements.
   * @returns The nested SDO elements of this DO container.
   */
   private getNestedSdoElements(): Element[] {
    const doType = this.getDOType(this.element)
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
      ${this.getNestedSdoElements().map(dO =>
        html`<do-container
          .element=${dO}
          .instanceElement=${this.getInstanceElement(dO)}>
        </do-container>`)}
    </action-pane>
    `;
  }

  static styles = css``;
}