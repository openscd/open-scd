import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

import { cloneElement } from '@openscd/xml';

import { SimpleAction } from '@openscd/core/foundation/deprecated/editor.js';
import { patterns } from './foundation/limits.js';

const lDeviceNamePattern =
  '[A-Za-z][0-9A-Za-z_]{0,2}|' +
  '[A-Za-z][0-9A-Za-z_]{4,63}|' +
  '[A-MO-Za-z][0-9A-Za-z_]{3}|' +
  'N[0-9A-Za-np-z_][0-9A-Za-z_]{2}|' +
  'No[0-9A-Za-mo-z_][0-9A-Za-z_]|' +
  'Non[0-9A-Za-df-z_]';

export function renderLdeviceWizard(
  ldName: string | null,
  readOnly: boolean,
  desc: string | null,
  inst: string | null,
  reservedInst: string[]
): TemplateResult[] {
  return [
    readOnly
      ? html`<wizard-textfield
          label="ldName"
          .maybeValue=${ldName}
          helper="${get('ldevice.wizard.noNameSupportHelper')}"
          helperPersistent
          readOnly
          disabled
        ></wizard-textfield>`
      : html`<wizard-textfield
          label="ldName"
          .maybeValue=${ldName}
          nullable
          helper="${get('ldevice.wizard.nameHelper')}"
          validationMessage="${get('textfield.required')}"
          dialogInitialFocus
          pattern="${lDeviceNamePattern}"
        ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get('ldevice.wizard.descHelper')}"
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="inst"
      .maybeValue=${inst}
      required
      helper="${get('ldevice.wizard.instHelper')}"
      validationMessage="${get('textfield.required')}"
      pattern="${patterns.normalizedString}"
      .reservedValues=${reservedInst}
    ></wizard-textfield>`,
  ];
}

function ldNameIsAllowed(element: Element): boolean {
  const ConfLdName = element
    .closest('IED')
    ?.querySelector('Services > ConfLdName');
  if (ConfLdName) return true;

  return false;
}

function reservedInstLDevice(currentElement: Element): string[] {
  const ied = currentElement.closest('IED');
  if (!ied) return [];

  return Array.from(
    ied.querySelectorAll(':scope > AccessPoint > Server > LDevice')
  )
    .map(ld => ld.getAttribute('inst') ?? '')
    .filter(name => name !== currentElement.getAttribute('inst'));
}

function updateAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const ldAttrs: Record<string, string | null> = {};
    const ldKeys = ['desc', 'inst'];
    ldKeys.forEach(key => {
      ldAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (ldKeys.some(key => ldAttrs[key] !== element.getAttribute(key))) {
      const newElement = cloneElement(element, ldAttrs);
      return [
        {
          old: { element },
          new: { element: newElement },
        },
      ];
    }
    return [];
  };
}

export function editLDeviceWizard(element: Element): Wizard {
  return [
    {
      title: get('ldevice.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateAction(element),
      },
      content: renderLdeviceWizard(
        element.getAttribute('ldName'),
        !ldNameIsAllowed(element),
        element.getAttribute('desc'),
        element.getAttribute('inst'),
        reservedInstLDevice(element)
      ),
    },
  ];
}
