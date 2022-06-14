import { get, translate } from "lit-translate";
import { html, TemplateResult } from "lit-element";

import {Switch} from "@material/mwc-switch";

import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-switch';

import '../../../wizard-textfield.js';
import '../../../WizardDivider.js';

import {
  ComplexAction,
  EditorAction,
  getNameAttribute,
  getValue, newLogEvent,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement
} from "../../../foundation.js";

import {
  createActions,
  createCheckActions,
  getCdcValue,
  getCtlModel,
  getFullPath
} from "../foundation/foundation.js";
import {cdcProcessings, SupportedCdcType, TiInformation} from "../foundation/cdc.js";

function getSwitchValue(wizard: Element, name: string): boolean {
  const switchElement = wizard.shadowRoot?.querySelector<Switch>(`mwc-switch[id="${name}"`);
  return switchElement?.checked ?? false;
}

export function createAddressAction(doiElement: Element, monitorTis: string[], controlTis: string[]): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    // Close previous wizard to prevent it from showing.
    wizard.dispatchEvent(newWizardEvent());

    const filters: string[] = [];
    const cdc = getCdcValue(doiElement) ?? '';
    const cdcProcessing = cdcProcessings[<SupportedCdcType>cdc];
    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.values.addedAddress', { name: getFullPath(doiElement, 'IED') }),
    };

    // Create all Monitor Addresses
    if (monitorTis.length > 0) {
      const selectedMonitorTi = getValue(inputs.find(i => i.label === 'monitorTi')!) ?? '';
      const monitorInverted = getSwitchValue(wizard, 'monitorInverted');
      const tiInformation = cdcProcessing.monitor[selectedMonitorTi];
      if (tiInformation) {
        filters.push(tiInformation.filter);
        complexAction.actions.push(...createActions(doiElement, wizard, selectedMonitorTi, monitorInverted, tiInformation));
      }

      const monitorCheck = getSwitchValue(wizard, 'monitorCheck');
      if (monitorCheck) {
        complexAction.actions.push(...createCheckActions(doiElement, wizard, selectedMonitorTi, tiInformation));
      }
    }

    // Create all Control Addresses
    const ctlModel = getCtlModel(doiElement);
    if (controlTis.length > 0 && ctlModel !== null && ctlModel !== 'status-only') {
      const selectedControlTi = getValue(inputs.find(i => i.label === 'controlTi')!) ?? '';
      const controlInverted = getSwitchValue(wizard, 'controlInverted');
      const tiInformation = cdcProcessing.control[selectedControlTi];
      if (tiInformation) {
        filters.push(tiInformation.filter);
        complexAction.actions.push(...createActions(doiElement, wizard, selectedControlTi, controlInverted, tiInformation));
      }

      const controlCheck = getSwitchValue(wizard, 'controlCheck');
      if (controlCheck) {
        complexAction.actions.push(...createCheckActions(doiElement, wizard, selectedControlTi, tiInformation));
      }
    }

    if (complexAction.actions.length > 0) {
      return [complexAction];
    }
    // There are no Address elements created for any DAI. Log error and close window.
    wizard.dispatchEvent(newWizardEvent());
    wizard.dispatchEvent(newLogEvent({
      kind: "error",
      title: get("protocol104.wizard.error.addAddressError", {
        filter: filters.map(filter => filter.replace(':scope >', '')).join(', '),
        cdc
      }),
    }));
    return [];
  }
}

export function disableCheckSwitch(tiInformations: Record<string, TiInformation>): boolean {
  let disableSwitch = true;
  Object.values(tiInformations).forEach(tiInformation => {
    if (tiInformation.checkFilter && tiInformation.checkCreate) {
      disableSwitch = false;
    }
  });
  return disableSwitch;
}

export function disableInvertedSwitch(tiInformations: Record<string, TiInformation>): boolean {
  let disableSwitch = true;
  Object.values(tiInformations).forEach(tiInformation => {
    if (tiInformation.inverted === true) {
      disableSwitch = false;
    }
  });
  return disableSwitch;
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
      fields.push(
        html `<mwc-formfield label="${translate('protocol104.wizard.monitorInverted')}">
                <mwc-switch id="monitorInverted"
                            .disabled="${disableInvertedSwitch(cdcProcessing.monitor)}">
                </mwc-switch>
              </mwc-formfield>`);
      fields.push(
        html `<mwc-formfield label="${translate('protocol104.wizard.monitorCheck')}">
                <mwc-switch id="monitorCheck"
                            .disabled="${disableCheckSwitch(cdcProcessing.monitor)}">
                </mwc-switch>
              </mwc-formfield>`);
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
      fields.push(
        html `<mwc-formfield label="${translate('protocol104.wizard.controlInverted')}">
                <mwc-switch id="controlInverted"
                            .disabled="${disableInvertedSwitch(cdcProcessing.control)}">
                </mwc-switch>
              </mwc-formfield>`);
      fields.push(
        html `<mwc-formfield label="${translate('protocol104.wizard.controlCheck')}">
                <mwc-switch id="controlCheck"
                            .disabled="${disableCheckSwitch(cdcProcessing.control)}">
                </mwc-switch>
              </mwc-formfield>`);
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
