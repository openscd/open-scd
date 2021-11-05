import { html } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  getValue,
  identity,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { wizards } from './wizard-library.js';

export function updateDataSetAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): WizardAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    const oldName = element.getAttribute('name');
    if (name === oldName && desc === element.getAttribute('desc')) return [];

    const newElement = cloneElement(element, { name, desc });

    const dataSetUpdateAction = [
      { old: { element }, new: { element: newElement } },
    ];

    const cbUpdateAction =
      name !== oldName
        ? Array.from(
            element.parentElement?.querySelectorAll(
              `ReportControlBock[datSet=${oldName}], GSEControl[datSet=${oldName}],SampledValueControl[datSet=${oldName}] `
            ) ?? []
          ).map(cb => {
            const newCb = cloneElement(element, { datSet: name });
            return { old: { element: cb }, new: { element: newCb } };
          })
        : [];

    return dataSetUpdateAction.concat(cbUpdateAction);
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
        html`<wizard-textfield
          label="name"
          .maybeValue=${name}
          helper="${translate('scl.name')}"
          required
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
        html`<filtered-list multi
          >${Array.from(element.querySelectorAll('FCDA')).map(
            fcda =>
              html`<mwc-check-list-item value="${identity(fcda)}"
                >${(<string>identity(fcda)).split('>')[4]}</mwc-check-list-item
              >`
          )}</filtered-list
        >`,
      ],
    },
  ];
}
