import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';

import '../../action-pane.js';
import './da-container.js';
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
   * Get the nested (B)DA element(s).
   * @returns The nested (B)DA element(s) of this DO container.
   */
  private getDAElements(): Element[] {
    const type = this.element.getAttribute('type') ?? undefined;
    const doType =  this.element.closest('SCL')!.querySelector(`:root > DataTypeTemplates > DOType[id="${type}"]`);
    if (doType != null) {
      return Array.from(doType!.querySelectorAll(':scope > DA'))
    }
    return [];
  }

  /**
   * Get the instance element (SDI) of a (S)DO element (if available)
   * @param dO - The (S)DO object to search with.
   * @returns The optional SDI element.
   */
  private getInstanceDOElement(dO: Element): Element | null {
    const sdoName = getNameAttribute(dO);
    if (this.instanceElement) {
      return this.instanceElement.querySelector(`:scope > SDI[name="${sdoName}"]`)
    }
    return null;
  }

  /**
   * Get the instance element (DAI) of a DA element (if available)
   * @param da - The (B)DA object to search with.
   * @returns The optional DAI element.
   */
  private getInstanceDAElement(da: Element): Element | null {
    const daName = getNameAttribute(da);
    if (this.instanceElement) {
      return this.instanceElement.querySelector(`:scope > DAI[name="${daName}"]`)
    }
    return null;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}" icon="${this.instanceElement != null ? 'done' : ''}">
      ${this.getDAElements().map(da =>
        html`<da-container
          .element=${da}
          .instanceElement=${this.getInstanceDAElement(da)}>
        </da-container>`)}
      ${this.getDOElements().map(dO =>
        html`<do-container
          .element=${dO}
          .instanceElement=${this.getInstanceDOElement(dO)}>
        </do-container>`)}
    </action-pane>
    `;
  }
}