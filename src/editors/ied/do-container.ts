import {
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';

import '@material/mwc-icon-button-toggle';
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';

import '../../action-pane.js';
import './da-container.js';
import { getDescriptionAttribute, getNameAttribute } from '../../foundation.js';
import { translate } from 'lit-translate';
import { Nsdoc } from '../../foundation/nsdoc.js';

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

  @property()
  nsdoc!: Nsdoc;
  
  @query('#toggleButton') toggleButton: IconButtonToggle | undefined;

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
    const daElements = this.getDAElements();
    const doElements = this.getDOElements();

    return html`<action-pane .label="${this.header()}" icon="${this.instanceElement != null ? 'done' : ''}">
      <abbr slot="action" title="${this.nsdoc.getDataDescription(this.element).label}">
        <mwc-icon-button
          icon="info"
        ></mwc-icon-button>
      </abbr>
      ${daElements.length > 0 || doElements.length > 0 ?
        html`<abbr slot="action" title="${translate('iededitor.toggleChildElements')}">
          <mwc-icon-button-toggle
            id="toggleButton"
            onIcon="keyboard_arrow_up"
            offIcon="keyboard_arrow_down"
            @click=${()=>this.requestUpdate()}
          ></mwc-icon-button-toggle>
        </abbr>` : nothing}
      ${this.toggleButton?.on ? daElements.map(da =>
        html`<da-container
          .element=${da}
          .instanceElement=${this.getInstanceDAElement(da)}
          .nsdoc=${this.nsdoc}>
        </da-container>`) : nothing}
      ${this.toggleButton?.on ? doElements.map(dO =>
        html`<do-container
          .element=${dO}
          .instanceElement=${this.getInstanceDOElement(dO)}
          .nsdoc=${this.nsdoc}>
        </do-container>`) : nothing}
    </action-pane>
    `;
  }
}