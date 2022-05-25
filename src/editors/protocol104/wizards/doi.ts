import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-textarea';

import {getNameAttribute, newWizardEvent, Wizard} from '../../../foundation.js';

import '../../../wizard-textfield.js';

import {getCdcValue, getFullPath, PRIVATE_TYPE_104} from "../foundation/foundation.js";

export function renderDAIWizard(doiElement: Element): TemplateResult[] {
  const iedElement = doiElement.closest('IED');
  const fullpath = getFullPath(doiElement, 'IED');
  const cdc = getCdcValue(doiElement);

  // Add the basic fields to the list.
  const fields: TemplateResult[] = [
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
  ];

  const firstAddressElement = doiElement.querySelector(`DAI > Private[type="${PRIVATE_TYPE_104}"] > Address`);
  if (firstAddressElement) {
    const ti = firstAddressElement.getAttribute('ti');

    fields.push(html `<wizard-textfield
                        label="ti"
                        .maybeValue=${ti}
                        disabled
                        readonly>
                      </wizard-textfield>`
    );
  }

  return fields;
}

export function showDOIInfoWizard(doiElement: Element): Wizard {
  function close() {
    return function () {
      document
        .querySelector('open-scd')!
        .dispatchEvent(newWizardEvent());
      return [];
    };
  }

  return [
    {
      title: get('protocol104.wizard.title.doiInfo'),
      secondary: {
        icon: '',
        label: get('close'),
        action: close(),
      },
      content: renderDAIWizard(doiElement),
    },
  ];
}
