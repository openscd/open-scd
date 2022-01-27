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
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';
import { until } from 'lit-html/directives/until';
import { Nsdoc } from '../../foundation/nsdoc.js';

/** [[`IED`]] plugin subeditor for editing `LN` and `LN0` element. */
@customElement('ln-container')
export class LNContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  @property()
  nsdoc!: Nsdoc;
  
  @query('#toggleButton') toggleButton!: IconButtonToggle | undefined;

  private async header(): Promise<TemplateResult> {
    const prefix = this.element.getAttribute('prefix');
    const inst = getInstanceAttribute(this.element);

    const data = this.nsdoc.getDataDescription(this.element);

    return html`${prefix != null ? html`${prefix} &mdash; ` : nothing}
            ${data.label}
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
   * @param dO - The DO object to use.
   * @returns The optional DOI object.
   */
  private getInstanceElement(dO: Element): Element | null {
    const doName = getNameAttribute(dO);
    return this.element.querySelector(`:scope > DOI[name="${doName}"]`)
  }

  render(): TemplateResult {
    const doElements = this.getDOElements();
    
    return html`<action-pane .label="${until(this.header())}">
      ${doElements.length > 0 ? html`<abbr slot="action" title="${translate('iededitor.toggleChildElements')}">
        <mwc-icon-button-toggle
          id="toggleButton"
          onIcon="keyboard_arrow_up"
          offIcon="keyboard_arrow_down"
          @click=${() => this.requestUpdate()}
        ></mwc-icon-button-toggle>
      </abbr>` : nothing}
      ${this.toggleButton?.on ? this.getDOElements().map(dO => html`<do-container
          .element=${dO}
          .instanceElement=${this.getInstanceElement(dO)}>
        </do-container>
        `) : nothing}
    </action-pane>`;
  }

  static styles = css``;
}