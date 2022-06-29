import { get, translate } from 'lit-translate';
import { html, TemplateResult } from 'lit-element';

import { Switch } from '@material/mwc-switch';

import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-switch';

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
  WizardInputElement,
} from '../../../foundation.js';

import {
  getCdcValueFromDOElement,
  getCtlModel,
  getFullPath,
} from '../foundation/foundation.js';
import {
  cdcProcessings,
  SupportedCdcType,
  TiInformation,
} from '../foundation/cdc.js';
import { createActions, createCheckActions } from '../foundation/actions.js';

function getSwitchValue(wizard: Element, name: string): boolean {
  const switchElement = wizard.shadowRoot?.querySelector<Switch>(
    `mwc-switch[id="${name}"`
  );
  return switchElement?.checked ?? false;
}

export function createAddressesAction(
  lnElement: Element,
  doElement: Element,
  hasControlTis: boolean
): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    // Close previous wizard (SelectDO) to prevent it from showing after saving.
    wizard.dispatchEvent(newWizardEvent());

    const cdc = getCdcValueFromDOElement(doElement) ?? '';
    const cdcProcessing = cdcProcessings[<SupportedCdcType>cdc];
    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.values.addedAddress', {
        name: getNameAttribute(doElement) ?? 'Unknown',
        lnName: getFullPath(lnElement, 'IED'),
      }),
    };

    // Create a Deep Clone of the LN Element, to keep track on which structure is initialized.
    const lnClonedElement = <Element>lnElement.cloneNode(true);

    // Create all Monitor Addresses
    const selectedMonitorTi =
      getValue(inputs.find(i => i.label === 'monitorTi')!) ?? '';
    const monitorInverted = getSwitchValue(wizard, 'monitorInverted');
    const tiInformation = cdcProcessing.monitor[selectedMonitorTi];
    if (tiInformation) {
      complexAction.actions.push(
        ...createActions(
          lnElement,
          lnClonedElement,
          doElement,
          wizard,
          selectedMonitorTi,
          monitorInverted,
          tiInformation
        )
      );
    }

    const monitorCheck = getSwitchValue(wizard, 'monitorCheck');
    if (monitorCheck) {
      complexAction.actions.push(
        ...createCheckActions(
          lnElement,
          lnClonedElement,
          doElement,
          wizard,
          selectedMonitorTi,
          tiInformation
        )
      );
    }

    // Create all Control Addresses
    if (hasControlTis) {
      const ctlModel = getCtlModel(lnElement, doElement);
      if (ctlModel !== null && ctlModel !== 'status-only') {
        const selectedControlTi =
          getValue(inputs.find(i => i.label === 'controlTi')!) ?? '';
        const controlInverted = getSwitchValue(wizard, 'controlInverted');

        const tiInformation = cdcProcessing.control[selectedControlTi];
        if (tiInformation) {
          complexAction.actions.push(
            ...createActions(
              lnElement,
              lnClonedElement,
              doElement,
              wizard,
              selectedControlTi,
              controlInverted,
              tiInformation
            )
          );
        }

        const controlCheck = getSwitchValue(wizard, 'controlCheck');
        if (controlCheck) {
          complexAction.actions.push(
            ...createCheckActions(
              lnElement,
              lnClonedElement,
              doElement,
              wizard,
              selectedControlTi,
              tiInformation
            )
          );
        }
      }
    }

    if (complexAction.actions.length > 0) {
      return [complexAction];
    }
    // There are no Address elements created for any DAI, close window.
    wizard.dispatchEvent(newWizardEvent());
    return [];
  };
}

export function disableCheckSwitch(
  tiInfo: Record<string, TiInformation>
): boolean {
  let disableSwitch = true;
  Object.values(tiInfo).forEach(tiInformation => {
    if (tiInformation.checkDaPaths && tiInformation.checkCreate) {
      disableSwitch = false;
    }
  });
  return disableSwitch;
}

export function disableInvertedSwitch(
  tiInfo: Record<string, TiInformation>
): boolean {
  let disableSwitch = true;
  Object.values(tiInfo).forEach(tiInformation => {
    if (tiInformation.inverted === true) {
      disableSwitch = false;
    }
  });
  return disableSwitch;
}

export function createAddressesWizard(
  lnElement: Element,
  doElement: Element
): Wizard {
  const cdc = getCdcValueFromDOElement(doElement) ?? '';
  const cdcProcessing = cdcProcessings[<SupportedCdcType>cdc];

  const monitorTis = Object.keys(cdcProcessing.monitor);
  const controlTis = Object.keys(cdcProcessing.control);

  function renderCreateAddressesWizard(): TemplateResult[] {
    const doName = getNameAttribute(doElement) ?? '';
    const iedElement = lnElement.closest('IED');
    const fullPath = getFullPath(lnElement, 'IED');

    // Add the basic fields to the list.
    const fields = [
      html`<wizard-textfield
        label="IED"
        .maybeValue="${getNameAttribute(iedElement!)}"
        disabled
        readonly
      >
      </wizard-textfield>`,
      html`<mwc-textarea
        label="LN(0)"
        value="${fullPath}"
        rows="2"
        cols="40"
        readonly
        disabled
      >
      </mwc-textarea>`,
      html`<wizard-textfield
        label="DO"
        .maybeValue="${doName}"
        disabled
        readonly
      >
      </wizard-textfield>`,
      html`<wizard-textfield
        label="Common Data Class"
        .maybeValue=${cdc}
        disabled
        readonly
      >
      </wizard-textfield>`,
    ];

    if (monitorTis.length > 0) {
      fields.push(html`<wizard-divider></wizard-divider>`);
      if (monitorTis.length > 1) {
        fields.push(
          html`<wizard-select
            label="monitorTi"
            helper="${translate('protocol104.wizard.monitorTiHelper')}"
            fixedMenuPosition
            required
          >
            ${monitorTis.map(
              monitorTi =>
                html` <mwc-list-item value="${monitorTi}">
                  <span>${monitorTi}</span>
                </mwc-list-item>`
            )}
          </wizard-select>`
        );
      } else {
        fields.push(
          html`<wizard-textfield
            label="monitorTi"
            .maybeValue=${monitorTis[0] ? monitorTis[0] : ''}
            disabled
          >
          </wizard-textfield>`
        );
      }
      fields.push(
        html`<mwc-formfield
          label="${translate('protocol104.wizard.monitorInverted')}"
        >
          <mwc-switch
            id="monitorInverted"
            .disabled="${disableInvertedSwitch(cdcProcessing.monitor)}"
          >
          </mwc-switch>
        </mwc-formfield>`
      );
      fields.push(
        html`<mwc-formfield
          label="${translate('protocol104.wizard.monitorCheck')}"
        >
          <mwc-switch
            id="monitorCheck"
            .disabled="${disableCheckSwitch(cdcProcessing.monitor)}"
          >
          </mwc-switch>
        </mwc-formfield>`
      );
    }

    if (controlTis.length > 0) {
      fields.push(html` <wizard-divider></wizard-divider>`);

      const ctlModel = getCtlModel(lnElement, doElement);
      if (ctlModel !== null) {
        fields.push(html` <wizard-textfield
          label="ctlModel"
          .maybeValue=${ctlModel}
          disabled
          readonly
        >
        </wizard-textfield>`);
      }

      if (ctlModel !== null && ctlModel !== 'status-only') {
        if (controlTis.length > 1) {
          fields.push(
            html` <wizard-select
              label="controlTi"
              helper="${translate('protocol104.wizard.controlTiHelper')}"
              fixedMenuPosition
              required
            >
              ${controlTis.map(
                controlTi =>
                  html` <mwc-list-item value="${controlTi}">
                    <span>${controlTi}</span>
                  </mwc-list-item>`
              )}
            </wizard-select>`
          );
        } else {
          fields.push(
            html` <wizard-textfield
              label="controlTi"
              .maybeValue=${controlTis[0] ? controlTis[0] : ''}
              disabled
            >
            </wizard-textfield>`
          );
        }
        fields.push(
          html` <mwc-formfield
            label="${translate('protocol104.wizard.controlInverted')}"
          >
            <mwc-switch
              id="controlInverted"
              .disabled="${disableInvertedSwitch(cdcProcessing.control)}"
            >
            </mwc-switch>
          </mwc-formfield>`
        );
        fields.push(
          html` <mwc-formfield
            label="${translate('protocol104.wizard.controlCheck')}"
          >
            <mwc-switch
              id="controlCheck"
              .disabled="${disableCheckSwitch(cdcProcessing.control)}"
            >
            </mwc-switch>
          </mwc-formfield>`
        );
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
        action: createAddressesAction(
          lnElement,
          doElement,
          controlTis.length > 0
        ),
      },
      content: renderCreateAddressesWizard(),
    },
  ];
}
