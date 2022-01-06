import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';

import '../../action-pane.js';
import './do-container.js';
import { getInstanceAttribute, getNameAttribute } from '../../foundation.js';
import { translate } from 'lit-translate';

/** [[`IED`]] plugin subeditor for editing `LN` and `LN0` element. */
@customElement('ln-container')
export class LNContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;
  
  @query('#toggleButton') toggleButton!: HTMLElement;

  private header(): TemplateResult {
    const prefix = this.element.getAttribute('prefix');
    const lnClass = this.element.getAttribute('lnClass');
    const inst = getInstanceAttribute(this.element);

    return html`${prefix != null ? html`${prefix} &mdash; ` : nothing}
            ${lnClass}
            ${inst ? html` &mdash; ${inst}` : nothing}`;
  }

  /**
   * Get the DO child elements of this LN(0) section.
   * @returns The DO child elements, or an empty array if none are found.
   */
  private getDOElements(): Element[] {
    const lnType = this.element.getAttribute('lnType') ?? undefined;
    const lNodeType = this.element.closest('SCL')!.querySelector(`:root > DataTypeTemplates > LNodeType[id="${lnType}"]`);
    if (lNodeType != null) {
      return Array.from(lNodeType.querySelectorAll(':scope > DO'));
    }
    return [];
  }

  /**
   * Get the instance element (DOI) of a DO element (if available)
   * @param dO - The DOI object to use.
   * @returns The optional DOI object.
   */
  private getInstanceElement(dO: Element): Element | null {
    const doName = getNameAttribute(dO);
    return this.element.querySelector(`:scope > DOI[name="${doName}"]`)
  }

  private toggle(): void {
    this.toggleButton.setAttribute('icon',
      this.toggleButton.getAttribute('icon') == 'keyboard_arrow_down' ? 'keyboard_arrow_up' : 'keyboard_arrow_down')

    this.shadowRoot!.querySelectorAll(':scope > action-pane > do-container').forEach(element => {
      element.hasAttribute('hidden') ? element.removeAttribute('hidden') : element.setAttribute('hidden', '')
    })
  }

  render(): TemplateResult {
    const doElements = this.getDOElements();
    
    return html`<action-pane .label="${this.header()}">
      ${doElements.length > 0 ? html`<abbr slot="action" title="${translate('iededitor.toggleChildElements')}">
        <mwc-icon-button
          id="toggleButton"
          icon="keyboard_arrow_down"
          @click=${() => this.toggle()}
        ></mwc-icon-button>
      </abbr>` : nothing}
      ${this.getDOElements().map(dO => html`<do-container
          .element=${dO}
          .instanceElement=${this.getInstanceElement(dO)}
          hidden>
        </do-container>
        `)}
    </action-pane>`;
  }

  static styles = css``;
}