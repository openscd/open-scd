import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult
} from "lit-element";
import { get, translate } from "lit-translate";

import {
  compareNames,
  newWizardEvent
} from "../../foundation.js";

import './ied-container.js';

import { PRIVATE_TYPE_104 } from "./foundation/foundation.js";
import { selectDoiWizard } from "./wizards/selectDoi.js";

/**
 * Container that will render an 'ied-104-container' for every IED which contains DAI Elements related to the
 * 104 Protocol.
 */
@customElement('values-104-container')
export class Values104Container extends LitElement {
  @property()
  doc!: XMLDocument;

  private getIEDElements(): Element[] {
    return Array.from(this.doc.querySelectorAll('IED'))
      .filter(ied => ied.querySelectorAll(`DAI > Private[type="${PRIVATE_TYPE_104}"]`).length > 0)
      .sort((a,b) => compareNames(a,b));
  }


  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  private openCreateAddressWizard(): void {
    this.dispatchEvent(newWizardEvent(selectDoiWizard(this.doc)));
  }

  render(): TemplateResult {
    const ieds = this.getIEDElements();
    if (ieds.length > 0) {
      return html `
        ${ieds.map(iedElement => {
          return html `<ied-104-container .element="${iedElement}"></ied-104-container>`;
        })}
        <h1>
          <mwc-fab extended
                   icon="add"
                   label="${get('protocol104.wizard.title.addAddress')}"
                   @click=${() => this.openCreateAddressWizard()}>
          </mwc-fab>
        </h1>      `;
    }
    return html `
      <h1>
        <span style="color: var(--base1)">${translate('protocol104.values.missing')}</span>
      </h1>`;
  }

  static styles = css `
    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }
  `;
}
