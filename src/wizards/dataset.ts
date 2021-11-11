import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  getValue,
  html,
  identity,
  newWizardEvent,
  selector,
  Update,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { wizards } from './wizard-library.js';
import { WizardTextField } from '../wizard-textfield.js';
import { FilteredList } from '../filtered-list.js';

function updateDataSetAction(element: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): WizardAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const oldName = element.getAttribute('name');

    const dataSetUpdateAction: Update[] = [];
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
        label: get('edit'),
        icon: 'save',
        action: updateDataSetAction(element),
      },
      content: [
        html`<${WizardTextField}
          label="name"
          .maybeValue=${name}
          helper="${translate('scl.name')}"
          required
        >
        </${WizardTextField}>`,
        html`<${WizardTextField}
          label="desc"
          .maybeValue=${desc}
          helper="${translate('scl.desc')}"
          nullable
          required
        >
        </${WizardTextField}>`,
        html`<mwc-button
          icon="add"
          label="${translate('wizard.title.add', { tagName: 'FCDA' })}"
          @click=${(e: Event) => {
            const wizard = wizards['FCDA'].create(element);
            if (wizard) {
              e.target?.dispatchEvent(newWizardEvent(wizard));
              e.target?.dispatchEvent(newWizardEvent());
            }
          }}
        ></mwc-button>`,
        html`<${FilteredList} multi
          >${Array.from(element.querySelectorAll('FCDA')).map(
            fcda =>
              html`<mwc-check-list-item selected value="${identity(fcda)}"
                >${(<string>identity(fcda)).split('>')[4]}</mwc-check-list-item
              >`
          )}</${FilteredList}
        >`,
      ],
    },
  ];
}
