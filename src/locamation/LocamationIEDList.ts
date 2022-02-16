import {css, customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {get, translate} from "lit-translate";

import {newSubWizardEvent, newWizardEvent, Wizard, WizardInput} from '../foundation.js';
import {isSCLNamespace} from "../schemas.js";
import {Nsdoc} from "../foundation/nsdoc.js";
import {dispatchEventOnOpenScd} from "../compas/foundation.js";

import {iedHeader, lDeviceHeader} from "./foundation.js";
import {locamationLNListWizard} from "./LocamationLNList.js";

@customElement('locamation-ied-list')
export class LocamationIEDListElement extends LitElement {
  @property({type: Document})
  doc!: XMLDocument;
  @property()
  nsdoc!: Nsdoc;

  private get logicaDevices(): Element[] {
    return Array.from(this.doc!.querySelectorAll(
        'IED[manufacturer="Locamation B.V."] LDevice'))
      .filter(isSCLNamespace)
      .filter(element => element.querySelector('LN > Private[type="LCMTN_VMU_SENSOR"]') !== null);
  }

  close(): void {
    // Close the Save Dialog.
    dispatchEventOnOpenScd(newWizardEvent());
  }

  render(): TemplateResult {
    const lDevices = this.logicaDevices;
    if (lDevices.length > 0) {
      return html `
        <mwc-list>
          ${lDevices.map(lDevice => {
              const ied = lDevice.closest('IED')!;
              return html`
                  <mwc-list-item
                    twoline
                    @click="${(e: Event) => {
                      e.target?.dispatchEvent(
                        newSubWizardEvent(() => locamationLNListWizard(lDevice, this.nsdoc))
                      );
                    }}"
                  >
                    <span>${iedHeader(ied)}</span>
                    <span slot="secondary">${lDeviceHeader(lDevice)}</span>
                  </mwc-list-item>`
            })}
        </mwc-list>
      `
    }
    return html `
      <mwc-list>
        <mwc-list-item><i>${translate('locamation.vmu.ied.missing')}</i></mwc-list-item>
      </mwc-list>
    `;
  }

  static styles = css`
    :host {
      width: 20vw;
    }
  `
}

export function locamationIEDListWizard(doc: XMLDocument, nsdoc: Nsdoc): Wizard {
  function close() {
    return function (inputs: WizardInput[], wizard: Element) {
      const locamationIEDListElement = <LocamationIEDListElement>wizard.shadowRoot!.querySelector('locamation-ied-list')
      locamationIEDListElement.close();
      return [];
    };
  }

  return [
    {
      title: get('locamation.vmu.ied.title'),
      secondary: {
        icon: 'close',
        label: get('close'),
        action: close(),
      },
      content: [
        html`<locamation-ied-list .doc="${doc}" .nsdoc="${nsdoc}"></locamation-ied-list>`,
      ],
    },
  ];
}

