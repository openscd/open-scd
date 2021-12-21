import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing, Template } from 'lit-html';

import '../../action-pane.js';
import './do-container.js';
import { compareNames, getInstanceAttribute } from '../../foundation.js';
import { throws } from 'assert';

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
   * Get the DOType of a certain DO.
   * @param doType - The type of a certain DO.
   * @returns The DOType section for a specific DO.
   */
  getDOType(dO: Element): Element | null {
    const doType = dO.getAttribute('type') ?? undefined;
    return this.element.closest('SCL')!.querySelector(`:root > DataTypeTemplates > DOType[id="${doType}"]`);
  }

  /**
   * Render all DO/SDO elements starting from a DO in NodeType.
   * @param dO - The starting DO element in NodeType to search from.
   * @returns TemplateResult containing all underlying DO/SDO elements.
   */
  renderDoContainers(dO: Element): TemplateResult {
    let sdoElements: TemplateResult | undefined;

    const doType = this.getDOType(dO);
    if (doType != null) {
      Array.from(doType!.querySelectorAll(':scope > SDO')).map(sdo => {
        sdoElements = this.renderDoContainers(sdo);
      })
    }
    
    return html`<do-container
      .element=${dO}
    ></do-container>
    ${sdoElements}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      ${Array.from(this.getLNodeType()!.querySelectorAll(':scope > DO'))
        .sort((a,b) => compareNames(a,b))
        .map(dO => this.renderDoContainers(dO))}
    </action-pane>`;
  }

  static styles = css``;
}