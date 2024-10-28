import {
  css,
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';
import { get } from 'lit-translate';

import {
  compareNames,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';

import './ied-container.js';

import { selectDoWizard } from './wizards/selectDo.js';
import { PROTOCOL_104_PRIVATE } from './foundation/private.js';
import { Base104Container } from './base-container.js';

/**
 * Container that will render an 'ied-104-container' for every IED which contains DAI Elements related to the
 * 104 Protocol.
 */
@customElement('values-104-container')
export class Values104Container extends Base104Container {
  @property()
  get iedElements(): Element[] {
    return Array.from(this.doc.querySelectorAll('IED'))
      .filter(
        ied =>
          ied.querySelectorAll(
            `DAI > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`
          ).length > 0
      )
      .sort((a, b) => compareNames(a, b));
  }

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  private openCreateAddressWizard(): void {
    this.dispatchEvent(newWizardEvent(selectDoWizard(this.doc)));
  }

  private renderAddButton(): TemplateResult {
    return html`<h1>
      <mwc-fab
        extended
        icon="add"
        label="${get('protocol104.wizard.title.addAddress')}"
        @click=${() => this.openCreateAddressWizard()}
      >
      </mwc-fab>
    </h1>`;
  }

  render(): TemplateResult {
    const ieds = this.iedElements;
    if (ieds.length > 0) {
      return html`
        ${ieds.map(iedElement => {
          return html`<ied-104-container
            .editCount=${this.editCount}
            .doc="${this.doc}"
            .element="${iedElement}"
          ></ied-104-container>`;
        })}
        ${this.renderAddButton()}
      `;
    }
    return html` <h1>
        <span style="color: var(--base1)"
          >${get('protocol104.values.missing')}</span
        >
      </h1>
      ${this.renderAddButton()}`;
  }

  static styles = css`
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
