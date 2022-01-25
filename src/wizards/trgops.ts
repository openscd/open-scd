import { html } from 'lit-html';
import { get } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';

import '../wizard-select.js';
import {
  cloneElement,
  getValue,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';

function updateTrgOpsAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): WizardAction[] => {
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
  const trgOps = ['dchg', 'qchg', 'dupd', 'period', 'gi'];

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateTrgOpsAction(element),
      },
      content: trgOps.map(
        trgOp =>
          html`<wizard-select
            label="${trgOp}"
            .maybeValue=${element.getAttribute(trgOp)}
            nullable
            required
            >${['true', 'false'].map(
              option =>
                html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
            )}</wizard-select
          >`
      ),
    },
  ];
}
