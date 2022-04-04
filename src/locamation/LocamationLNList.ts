import {css, customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {get, translate} from "lit-translate";

import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import {newSubWizardEvent, newWizardEvent, Wizard, WizardInputElement} from '../foundation.js';
import {isSCLNamespace} from "../schemas.js";
import {Nsdoc} from "../foundation/nsdoc.js";

import '../wizard-textfield.js';

import {locamationLNEditWizard} from "./LocamationLNEdit.js";
import {getPrivate, getPrivateTextValue, iedHeader, lDeviceHeader, lnHeader, LOCAMATION_PRIVATE} from "./foundation.js";

@customElement('locamation-ln-list')
export class LocamationLNodeListElement extends LitElement {
  @property({type: Element})
  lDevice!: Element;
  @property()
  nsdoc!: Nsdoc;

  private get logicaNodes(): Element[] {
    return Array.from(this.lDevice!.querySelectorAll('LN'))
      .filter(isSCLNamespace)
      .filter(element => element.querySelector(`Private[type="${LOCAMATION_PRIVATE}"]`) !== null);
  }

  close(): void {
    // Close the Save Dialog.
    this.dispatchEvent(newWizardEvent());
  }

  render(): TemplateResult {
    const logicalNodes = this.logicaNodes;
    if (logicalNodes.length > 0) {
      const ied = this.lDevice.closest('IED')!;
      return html `
        <wizard-textfield label="IED"
                          .maybeValue=${iedHeader(ied)}
                          helper="${translate('locamation.vmu.ied.name')}"
                          disabled>
        </wizard-textfield>
        <wizard-textfield label="Logical Device"
                          .maybeValue=${lDeviceHeader(this.lDevice)}
                          helper="${translate('locamation.vmu.ldevice.name')}"
                          disabled>
        </wizard-textfield>
        <mwc-list>
          ${logicalNodes.map(ln => {
            const locamationPrivate = getPrivate(ln);
            const locamationVersion = getPrivateTextValue(locamationPrivate, 'VERSION');

            return html`
                <mwc-list-item
                  .disabled="${locamationVersion !== '1'}"
                  @click="${(e: Event) => {
                    e.target?.dispatchEvent(
                      newSubWizardEvent(() => locamationLNEditWizard(ln, this.nsdoc))
                    );
                  }}"
                >
                  <span>${lnHeader(ln, this.nsdoc)}</span>
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

    * {
      display: block;
      margin-top: 16px;
    }
  `
}

export function locamationLNListWizard(lDevice: Element, nsdoc: Nsdoc): Wizard {
  function close() {
    return function (inputs: WizardInputElement[], wizard: Element) {
      const locamationIEDListElement = <LocamationLNodeListElement>wizard.shadowRoot!.querySelector('locamation-ln-list')
      locamationIEDListElement.close();
      return [];
    };
  }

  return [
    {
      title: get('locamation.vmu.ln.title'),
      secondary: {
        icon: 'close',
        label: get('close'),
        action: close(),
      },
      content: [
        html`<locamation-ln-list .lDevice="${lDevice}" .nsdoc="${nsdoc}"></locamation-ln-list>`,
      ],
    },
  ];
}

