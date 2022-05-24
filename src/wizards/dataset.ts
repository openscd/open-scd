import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { html } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-check-list-item';

import '../wizard-textfield.js';
import '../filtered-list.js';
import {
  cloneElement,
  getValue,
  identity,
  selector,
  Replace,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
  newSubWizardEvent,
} from '../foundation.js';
import { createFCDAsWizard } from './fcda.js';

function openFcdaWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => createFCDAsWizard(element)));
  };
}

function updateDataSetAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): WizardAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const oldName = element.getAttribute('name');

    const dataSetUpdateAction: Replace[] = [];
    if (!(name === oldName && desc === element.getAttribute('desc'))) {
      const newElement = cloneElement(element, { name, desc });

      dataSetUpdateAction.push({
        old: { element },
        new: { element: newElement },
      });
    }

    const controlBlockUpdateActions =
      name !== oldName
        ? Array.from(
            element.parentElement?.querySelectorAll(
              `ReportControlBock[datSet=${oldName}], GSEControl[datSet=${oldName}],SampledValueControl[datSet=${oldName}] `
            ) ?? []
          ).map(cb => {
            const newCb = cloneElement(cb, { datSet: name });
            return { old: { element: cb }, new: { element: newCb } };
          })
        : [];

    const fCDARemoveActions = Array.from(
      wizard.shadowRoot!.querySelectorAll(
        'filtered-list > mwc-check-list-item:not([selected])'
      )
    )
      .map(listItem =>
        element.querySelector(selector('FCDA', (<CheckListItem>listItem).value))
      )
      .filter(fcda => fcda)
      .map(fcda => {
        return {
          old: {
            parent: element,
            element: fcda!,
            reference: fcda!.nextSibling,
          },
        };
      });

    return [
      ...fCDARemoveActions,
      ...dataSetUpdateAction,
      ...controlBlockUpdateActions,
    ];
  };
}

export function editDataSetWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        label: get('save'),
        icon: 'save',
        action: updateDataSetAction(element),
      },
      menuActions: [
        {
          icon: 'add',
          label: get('dataset.fcda.add'),
          action: openFcdaWizard(element),
        },
      ],
      content: [
        html`<wizard-textfield
          label="name"
          .maybeValue=${name}
          helper="${translate('scl.name')}"
          required
          disabled="true"
        >
        </wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          .maybeValue=${desc}
          helper="${translate('scl.desc')}"
          nullable
          required
        >
        </wizard-textfield>`,
        html`<filtered-list multi
          >${Array.from(element.querySelectorAll('FCDA')).map(
            fcda =>
              html`<mwc-check-list-item selected value="${identity(fcda)}"
                >${(<string>identity(fcda))
                  .split('>')
                  .pop()}</mwc-check-list-item
              >`
          )}</filtered-list
        >`,
      ],
    },
  ];
}
