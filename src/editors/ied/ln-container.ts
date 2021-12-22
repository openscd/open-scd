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
import './do-container.js';
import { compareNames, getInstanceAttribute, getNameAttribute } from '../../foundation.js';

/** [[`IED`]] plugin subeditor for editing `LN` and `LN0` element. */
@customElement('ln-container')
export class LNContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    const prefix = this.element.getAttribute('prefix');
    const lnClass = this.element.getAttribute('lnClass');
    const inst = getInstanceAttribute(this.element);

    return html`${prefix != null ? html`${prefix} &mdash; ` : nothing}
            ${lnClass}
            ${inst ? html` &mdash; ${inst}` : nothing}`;
  }

  /**
   * Get the LNodeType of this LN(0) section.
   * @returns The LNodeType section, or null if not found.
   */
  getLNodeType(): Element | null {
    const lnType = this.element.getAttribute('lnType') ?? undefined;
    return this.element.closest('SCL')!.querySelector(`:root > DataTypeTemplates > LNodeType[id="${lnType}"]`);
  }

  /**
   * Get the instance element (DOI) of a DO element (if available)
   * @param dO - The DOI object to use.
   * @returns The optional DOI object.
   */
  getInstanceElement(dO: Element): Element | null {
    const doName = getNameAttribute(dO);
    return this.element.querySelector(`:scope > DOI[name="${doName}"]`)
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      ${Array.from(this.getLNodeType() ? this.getLNodeType()!.querySelectorAll(':scope > DO') : [])
        .sort((a,b) => compareNames(a,b))
        .map(dO => html`<do-container
          .element=${dO}
          .instanceElement=${this.getInstanceElement(dO)}>
        </do-container>
        `)}
    </action-pane>`;
  }

  static styles = css``;
}