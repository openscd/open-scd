import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';

import '../../action-pane.js';
import { getDescriptionAttribute, getNameAttribute } from '../../foundation.js';

/** [[`IED`]] plugin subeditor for editing `(B)DA` element. */
@customElement('da-container')
export class DAContainer extends LitElement {
  /**
   * The DA itself.
   */
  @property({ attribute: false })
  element!: Element;

  /**
   * The optional DAI of this (B)DA.
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
   * Get an (optional) value of a DA(I).
   * If there is a DAI, it get's priority.
   * @returns 
   */
  private getDAValue(): TemplateResult {
    if (this.instanceElement) {
      return html`${this.getValueElement(this.instanceElement)}`
    }

    return html`${this.getValueElement(this.element)}`;
  }

  /**
   * Get the 'Val' element of another element.
   * @param element - The element to search for an 'Val' element.
   * @returns the 'Val' element, or null if not found.
   */
  private getValueElement(element: Element): Element | null {
    return element.querySelector('Val') ?? null;
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

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}" icon="${this.instanceElement != null ? 'done' : ''}">
      ${this.getDAValue()}
      ${this.getDAElements().map(da =>
        html`<da-container
          .element=${da}>
        </da-container>`)}
    </action-pane>
    `;
  }
}