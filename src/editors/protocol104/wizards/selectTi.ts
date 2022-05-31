import { get, translate } from "lit-translate";
import { html, TemplateResult } from "lit-element";

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

import { getCdcValue, getFullPath} from "../foundation/foundation.js";
import { cdcProcessings, SupportedCdcType} from "../foundation/cdc.js";
import { editAddressWizard } from "./address.js";

function createAddressAction(doiElement: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    // Close previous wizard to prevent it from showing.
    wizard.dispatchEvent(newWizardEvent());

    const cdc = getCdcValue(doiElement) ?? '';
    const cdcProcessing = cdcProcessings[<SupportedCdcType>cdc];
    if (cdcProcessing === undefined) {
      return [];
    }

    const selectedMonitorTi = getValue(inputs.find(i => i.label === 'monitorTi')!) ?? '';
    if (!cdcProcessing.monitor[selectedMonitorTi]) {
      return [];
    }
    // There is only one TI available to select from, so the new Address element can be created.
    const daiElement = doiElement.querySelector(cdcProcessing.monitor[selectedMonitorTi].filter);
    if (!daiElement) {
      return [];
    }

    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.addedAddress', { name: getFullPath(daiElement, 'DOI') }),
    };
    if (cdcProcessing.monitor[selectedMonitorTi]) {
      const createActions = cdcProcessing.monitor[selectedMonitorTi].create(daiElement, selectedMonitorTi);
      complexAction.actions.push(...createActions);

      createActions.forEach(createAction => {
        const privateElement = <Element>createAction.new.element;
        Array.from(privateElement.querySelectorAll('Address'))
          .forEach(addressElement => {
            wizard.dispatchEvent(newWizardEvent(editAddressWizard(daiElement, addressElement)));
          })
      })
    }
    return [complexAction];
  }
}

export function selectTiWizard(doiElement: Element, monitorTis: string[]): Wizard {
  function renderTiWizard(doiElement: Element, monitorTis: string[]): TemplateResult[] {
    const iedElement = doiElement.closest('IED');
    const fullpath = getFullPath(doiElement, 'IED');
    const cdc = getCdcValue(doiElement);

    // Add the basic fields to the list.
    return [
      html `<wizard-textfield
            label="IED"
            .maybeValue=${getNameAttribute(iedElement!)}
            disabled
            readonly>
          </wizard-textfield>`,
      html `<mwc-textarea
            label="DOI"
            value="${fullpath}"
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
          </wizard-textfield>`,
      html `<wizard-select
            label="monitorTi"
            helper="${translate('protocol104.wizard.monitorTiHelper')}"
            fixedMenuPosition
            required>
            ${monitorTis.map(
        monitorTi =>
          html `<mwc-list-item value="${monitorTi}">
                  <span>${monitorTi}</span>
                </mwc-list-item>`
          )}
          </wizard-select>`
    ];
  }

  return [
    {
      title: get('wizard.title.add', { tagName: 'Address' }),
      primary: {
        label: 'add',
        icon: 'add',
        action: createAddressAction(doiElement),
      },
      content: renderTiWizard(doiElement, monitorTis),
    },
  ];
}
