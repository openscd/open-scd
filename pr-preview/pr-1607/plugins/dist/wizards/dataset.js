import { html } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js';
import '../../../openscd/src/wizard-textfield.js';
import '../../../openscd/src/filtered-list.js';
import { find, getValue, identity, newSubWizardEvent, } from '../../../openscd/src/foundation.js';
import { cloneElement } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { createFCDAsWizard } from './fcda.js';
function openFcdaWizard(element) {
    return (wizard) => {
        wizard.dispatchEvent(newSubWizardEvent(() => createFCDAsWizard(element)));
    };
}
function updateDataSetAction(element) {
    return (inputs, wizard) => {
        const name = inputs.find(i => i.label === 'name').value;
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        const oldName = element.getAttribute('name');
        const dataSetUpdateAction = [];
        if (!(name === oldName && desc === element.getAttribute('desc'))) {
            const newElement = cloneElement(element, { name, desc });
            dataSetUpdateAction.push({
                old: { element },
                new: { element: newElement },
            });
        }
        const controlBlockUpdateActions = name !== oldName
            ? Array.from(element.parentElement?.querySelectorAll(`ReportControlBock[datSet=${oldName}], GSEControl[datSet=${oldName}],SampledValueControl[datSet=${oldName}] `) ?? []).map(cb => {
                const newCb = cloneElement(cb, { datSet: name });
                return { old: { element: cb }, new: { element: newCb } };
            })
            : [];
        const fCDARemoveActions = Array.from(wizard.shadowRoot.querySelectorAll('filtered-list > mwc-check-list-item:not([selected])'))
            .map(listItem => find(element, 'FCDA', listItem.value))
            .filter(fcda => fcda)
            .map(fcda => {
            return {
                old: {
                    parent: element,
                    element: fcda,
                    reference: fcda.nextSibling,
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
export function editDataSetWizard(element) {
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
                html `<wizard-textfield
          label="name"
          .maybeValue=${name}
          helper="${get('scl.name')}"
          required
          disabled="true"
        >
        </wizard-textfield>`,
                html `<wizard-textfield
          label="desc"
          .maybeValue=${desc}
          helper="${get('scl.desc')}"
          nullable
          required
        >
        </wizard-textfield>`,
                html `<filtered-list multi
          >${Array.from(element.querySelectorAll('FCDA')).map(fcda => html `<mwc-check-list-item selected value="${identity(fcda)}"
                >${identity(fcda)
                    .split('>')
                    .pop()}</mwc-check-list-item
              >`)}</filtered-list
        >`,
            ],
        },
    ];
}
//# sourceMappingURL=dataset.js.map