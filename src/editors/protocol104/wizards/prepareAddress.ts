import { get, translate } from "lit-translate";
import { html, TemplateResult } from "lit-element";

import '../../../wizard-textfield.js';
import '../../../WizardDivider.js';

import {
  ComplexAction,
  EditorAction,
  getNameAttribute,
  getValue,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement
} from "../../../foundation.js";

import {
  createActions,
  getCdcValue,
  getFullPath
} from "../foundation/foundation.js";
import { cdcProcessings, SupportedCdcType } from "../foundation/cdc.js";

export function getCtlModel(doiElement: Element): string | null {
  const valElement = doiElement.querySelector('DAI[name="ctlModel"] > Val');
  if (valElement) {
    return valElement.textContent;
  }
  return null;
}

export function createAddressAction(doiElement: Element, monitorTis: string[], controlTis: string[]): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    // Close previous wizard to prevent it from showing.
    wizard.dispatchEvent(newWizardEvent());

    const cdc = getCdcValue(doiElement) ?? '';
    const cdcProcessing = cdcProcessings[<SupportedCdcType>cdc];
    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.values.addedAddress', { name: getFullPath(doiElement, 'IED') }),
    };
    if (monitorTis.length > 0) {
      const selectedMonitorTi = getValue(inputs.find(i => i.label === 'monitorTi')!) ?? '';
      if (cdcProcessing.monitor[selectedMonitorTi]) {
        complexAction.actions.push(
          ...createActions(
            doiElement, wizard, selectedMonitorTi,
            cdcProcessing.monitor[selectedMonitorTi].filter,
            cdcProcessing.monitor[selectedMonitorTi].create))
      }
    }

    const ctlModel = getCtlModel(doiElement);
    if (controlTis.length > 0 && ctlModel !== null && ctlModel !== 'status-only') {
      const selectedControlTi = getValue(inputs.find(i => i.label === 'controlTi')!) ?? '';
      if (cdcProcessing.control[selectedControlTi]) {
        complexAction.actions.push(
          ...createActions(
            doiElement, wizard, selectedControlTi,
            cdcProcessing.control[selectedControlTi].filter,
            cdcProcessing.control[selectedControlTi].create))
      }
    }

    if (complexAction.actions.length > 0) {
      return [complexAction];
    }
    // There are no Address elements created for any DAI, so just close the wizard.
    wizard.dispatchEvent(newWizardEvent());
    return [];
  }
}

export function prepareAddressWizard(doiElement: Element): Wizard {
  const cdc = getCdcValue(doiElement) ?? '';
  const cdcProcessing = cdcProcessings[<SupportedCdcType>cdc];

  const monitorTis = Object.keys(cdcProcessing.monitor);
  const controlTis = Object.keys(cdcProcessing.control);

  function renderTiWizard(): TemplateResult[] {
    const iedElement = doiElement.closest('IED');
    const fullPath = getFullPath(doiElement, 'IED');

    // Add the basic fields to the list.
    const fields = [
      html `<wizard-textfield
              label="IED"
              .maybeValue=${getNameAttribute(iedElement!)}
              disabled
              readonly>
            </wizard-textfield>`,
      html `<mwc-textarea
              label="DOI"
              value="${fullPath}"
              rows="2"
              cols="40"
              readonly
              disabled>
            </mwc-textarea>`,
      html `<wizard-textfield
              label="cdc"
              .maybeValue=${cdc}
              disabled
              readonly>
            </wizard-textfield>`];

    const ctlModel = getCtlModel(doiElement);
    if (ctlModel !== null) {
      fields.push(html `<wizard-textfield
                          label="ctlModel"
                          .maybeValue=${ctlModel}
                          disabled
                          readonly>
                        </wizard-textfield>`);
    }

    if (monitorTis.length > 0) {
      fields.push(html `<wizard-divider></wizard-divider>`)
      if (monitorTis.length > 1) {
        fields.push(
          html `<wizard-select
                  label="monitorTi"
                  helper="${translate('protocol104.wizard.monitorTiHelper')}"
                  fixedMenuPosition
                  required>
                  ${monitorTis.map(
                    monitorTi =>
                      html`
                        <mwc-list-item value="${monitorTi}">
                          <span>${monitorTi}</span>
                        </mwc-list-item>`
                  )}
                </wizard-select>`);
      } else {
        fields.push(
          html `<wizard-textfield
                  label="monitorTi"
                  .maybeValue=${monitorTis[0] ? monitorTis[0] : ''}
                  disabled>
                </wizard-textfield>`);
      }
    }

    if (controlTis.length > 0 && ctlModel !== null && ctlModel !== 'status-only') {
      fields.push(html `<wizard-divider></wizard-divider>`)
      if (controlTis.length > 1) {
        fields.push(
          html `<wizard-select
                  label="controlTi"
                  helper="${translate('protocol104.wizard.controlTiHelper')}"
                  fixedMenuPosition
                  required>
                  ${controlTis.map(
                    controlTi =>
                      html`
                        <mwc-list-item value="${controlTi}">
                          <span>${controlTi}</span>
                        </mwc-list-item>`
                  )}
                </wizard-select>`);
      } else {
        fields.push(
          html `<wizard-textfield
                  label="controlTi"
                  .maybeValue=${controlTis[0] ? controlTis[0] : ''}
                  disabled>
                </wizard-textfield>`);
      }
    }
    return fields;
  }

  return [
    {
      title: get('wizard.title.add', { tagName: 'Address' }),
      primary: {
        icon: 'add',
        label: get('add'),
        action: createAddressAction(doiElement, monitorTis, controlTis),
      },
      content: renderTiWizard(),
    },
  ];
}
