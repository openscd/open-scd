import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

import { cloneElement } from '@openscd/xml';

import { SimpleAction } from '@openscd/core/foundation/deprecated/editor.js';

export function renderLNWizard(
  lnType: string | null,
  desc: string | null,
  prefix: string | null,
  lnClass: string | null,
  inst: string | null,
  reservedInst: string[]
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="lnType"
      .maybeValue=${lnType}
      readonly
      required
      helper="${get('ln.wizard.lnTypeHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get('ln.wizard.descHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="prefix"
      nullable
      .maybeValue=${prefix}
      helper="${get('ln.wizard.prefixHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="lnClass"
      readonly
      required
      .maybeValue=${lnClass}
      helper="${get('ln.wizard.lnClassHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="inst"
      .maybeValue=${inst}
      helper="${get('ln.wizard.instHelper')}"
      pattern="[0-9]{1,12}"
      required
      .reservedValues=${reservedInst}
    ></wizard-textfield>`,
  ];
}

function updateAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const ldAttrs: Record<string, string | null> = {};
    const ldKeys = ['lnType', 'desc', 'prefix', 'lnClass', 'inst'];
    ldKeys.forEach(key => {
      ldAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (!ldKeys.some(key => ldAttrs[key] !== element.getAttribute(key))) {
      return [];
    }

    const ldevice = element.closest('LDevice');
    if (ldevice) {
      const newPrefix = ldAttrs['prefix'] || '';
      const newLnClass = ldAttrs['lnClass'];
      const newInst = ldAttrs['inst'];

      const isDuplicate = Array.from(
        ldevice.querySelectorAll(':scope > LN')
      ).some(
        ln =>
          ln !== element &&
          (ln.getAttribute('prefix') || '') === newPrefix &&
          ln.getAttribute('lnClass') === newLnClass &&
          ln.getAttribute('inst') === newInst
      );

      if (isDuplicate) {
        return [];
      }
    }

    const newElement = cloneElement(element, ldAttrs);
    return [
      {
        old: { element },
        new: { element: newElement },
      },
    ];
  };
}

function reservedInstLN(
  currentElement: Element,
  prefixInput?: string
): string[] {
  const ldevice = currentElement.closest('LDevice');
  if (!ldevice) return [];

  const currentLnClass = currentElement.getAttribute('lnClass');

  const targetPrefix =
    prefixInput !== undefined
      ? prefixInput
      : currentElement.getAttribute('prefix') || '';

  const lnElements = Array.from(ldevice.querySelectorAll(':scope > LN')).filter(
    ln =>
      ln !== currentElement &&
      (ln.getAttribute('prefix') || '') === targetPrefix &&
      ln.getAttribute('lnClass') === currentLnClass
  );

  return lnElements
    .map(ln => ln.getAttribute('inst'))
    .filter(inst => inst !== null) as string[];
}

export function editLNWizard(element: Element): Wizard {
  return [
    {
      title: get('ln.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateAction(element),
      },
      content: renderLNWizard(
        element.getAttribute('lnType'),
        element.getAttribute('desc'),
        element.getAttribute('prefix'),
        element.getAttribute('lnClass'),
        element.getAttribute('inst'),
        reservedInstLN(element)
      ),
    },
  ];
}
