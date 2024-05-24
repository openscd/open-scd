import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';

import '@openscd/open-scd/src/wizard-checkbox.js';
import '@openscd/open-scd/src/wizard-select.js';

import { cloneElement } from '@openscd/xml';

import {
  getValue,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

interface ContentOptions {
  dchg: string | null;
  qchg: string | null;
  dupd: string | null;
  period: string | null;
  gi: string | null;
}

export function contentTrgOpsWizard(option: ContentOptions): TemplateResult[] {
  return Object.entries(option).map(
    ([key, value]) =>
      html`<wizard-checkbox
        label="${key}"
        .maybeValue=${value}
        nullable
        helper="${get(`scl.${key}`)}"
      ></wizard-checkbox>`
  );
}

function updateTrgOpsAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): WizardAction[] => {
    const dchg = getValue(inputs.find(i => i.label === 'dchg')!);
    const qchg = getValue(inputs.find(i => i.label === 'qchg')!);
    const dupd = getValue(inputs.find(i => i.label === 'dupd')!);
    const period = getValue(inputs.find(i => i.label === 'period')!);
    const gi = getValue(inputs.find(i => i.label === 'gi')!);

    if (
      dchg === element.getAttribute('dchg') &&
      qchg === element.getAttribute('qchg') &&
      dupd === element.getAttribute('dupd') &&
      period === element.getAttribute('period') &&
      gi === element.getAttribute('gi')
    )
      return [];

    const newElement = cloneElement(element, {
      dchg,
      qchg,
      dupd,
      period,
      gi,
    });
    const trgOptAction = { old: { element }, new: { element: newElement } };

    return [trgOptAction];
  };
}

export function editTrgOpsWizard(element: Element): Wizard {
  const [dchg, qchg, dupd, period, gi] = [
    'dchg',
    'qchg',
    'dupd',
    'period',
    'gi',
  ].map(trgOp => element.getAttribute(trgOp));

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateTrgOpsAction(element),
      },
      content: contentTrgOpsWizard({ dchg, qchg, dupd, period, gi }),
    },
  ];
}
