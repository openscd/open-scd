import { html } from 'lit-html';
import { get } from 'lit-translate';
import {
  cloneElement,
  EditorAction,
  getValue,
  Update,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import {
  editReportControlWizard,
  openEditReportControlWizardAction,
} from './reportcontrol.js';

function updateIntPdAction(
  element: Element,
  tobeadded: boolean
): EditorAction | undefined {
  if (
    (tobeadded && element.getAttribute('intgPd')) ||
    (!tobeadded && !element.getAttribute('intgPd'))
  )
    return;

  const intgPd = tobeadded ? '1000' : null;
  const newElement = cloneElement(element, { intgPd });
  return { old: { element }, new: { element: newElement } };
}

export function updateTrgOpsAction(element: Element): WizardActor {
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

    const intPdAction = updateIntPdAction(
      element.parentElement!,
      period === 'true' ? true : false
    );

    const parent = intPdAction
      ? (<Update>intPdAction).new.element!
      : element.parentElement!;

    const openEditReportCbWizard = () => editReportControlWizard(parent);

    return intPdAction
      ? [trgOptAction, intPdAction, openEditReportCbWizard]
      : [trgOptAction, openEditReportCbWizard];
  };
}

export function editTrgOpsWizard(element: Element): Wizard {
  const trgOps = ['dchg', 'qchg', 'dupd', 'period', 'gi'];

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      secondary: {
        icon: '',
        label: get('back'),
        action: openEditReportControlWizardAction(element.parentElement!),
      },
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
