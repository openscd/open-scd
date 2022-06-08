import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-textarea';

import {
  ComplexAction,
  getNameAttribute,
  newActionEvent,
  newWizardEvent,
  Wizard,
  WizardMenuActor,
} from '../../../foundation.js';

import '../../../wizard-textfield.js';

import {
  getCdcValue,
  getCtlModel,
  getFullPath,
  PRIVATE_TYPE_104,
} from '../foundation/foundation.js';

export function renderDOIWizard(doiElement: Element): TemplateResult[] {
  const iedElement = doiElement.closest('IED');
  const fullpath = getFullPath(doiElement, 'IED');
  const cdc = getCdcValue(doiElement);

  // Add the basic fields to the list.
  const fields: TemplateResult[] = [
    html`<wizard-textfield
      label="IED"
      .maybeValue=${getNameAttribute(iedElement!)}
      disabled
      readonly
    >
    </wizard-textfield>`,
    html`<mwc-textarea
      label="DOI"
      value="${fullpath}"
      rows="2"
      cols="40"
      readonly
      disabled
    >
    </mwc-textarea>`,
    html`<wizard-textfield label="cdc" .maybeValue=${cdc} disabled readonly>
    </wizard-textfield>`,
  ];

  const firstAddressElement = doiElement.querySelector(
    `DAI > Private[type="${PRIVATE_TYPE_104}"] > Address`
  );
  if (firstAddressElement) {
    const ti = firstAddressElement.getAttribute('ti');

    fields.push(html`<wizard-textfield
      label="ti"
      .maybeValue=${ti}
      disabled
      readonly
    >
    </wizard-textfield>`);
  }

  const ctlModel = getCtlModel(doiElement);
  if (ctlModel !== null) {
    fields.push(html`<wizard-textfield
      label="ctlModel"
      .maybeValue=${ctlModel}
      disabled
      readonly
    >
    </wizard-textfield>`);
  }

  return fields;
}

export function remove104Private(doiElement: Element): WizardMenuActor {
  return (wizard: Element): void => {
    // The 104 Private Element only contains Address Elements, so we can remove all the 104 Private Elements
    // to remove all the Address Elements also.
    const privateElements = doiElement.querySelectorAll(
      `DAI > Private[type="${PRIVATE_TYPE_104}"]`
    );
    if (privateElements.length > 0) {
      const complexAction: ComplexAction = {
        actions: [],
        title: get('protocol104.values.removedAddresses', {
          name: getFullPath(doiElement, 'SCL'),
          nrOfAddresses: privateElements.length,
        }),
      };
      privateElements.forEach(privateElement => {
        complexAction.actions.push({
          old: {
            parent: privateElement.parentElement!,
            element: privateElement,
          },
        });
      });

      wizard.dispatchEvent(newActionEvent(complexAction));
      wizard.dispatchEvent(newWizardEvent());
    }
  };
}

export function showDOIInfoWizard(doiElement: Element): Wizard {
  function close() {
    return function () {
      document.querySelector('open-scd')!.dispatchEvent(newWizardEvent());
      return [];
    };
  }

  return [
    {
      title: get('protocol104.wizard.title.doiInfo'),
      menuActions: [
        {
          label: get('protocol104.values.removeAddresses'),
          icon: 'delete',
          action: remove104Private(doiElement),
        },
      ],
      secondary: {
        icon: '',
        label: get('close'),
        action: close(),
      },
      content: renderDOIWizard(doiElement),
    },
  ];
}
