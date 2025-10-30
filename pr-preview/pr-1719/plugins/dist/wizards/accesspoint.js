import { html } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../openscd/src/wizard-textfield.js';
import { newWizardEvent, isPublic, identity, } from '../../../openscd/src/foundation.js';
import { updateNamingAttributeWithReferencesAction } from './foundation/actions.js';
import { deleteReferences } from './foundation/references.js';
import { patterns } from './foundation/limits.js';
export function renderAccessPointWizard(name, desc, reservedNames) {
    return [
        html `<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get('accesspoint.wizard.nameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
    >
    </wizard-textfield>`,
        html `<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get('accesspoint.wizard.descHelper')}"
      pattern="${patterns.normalizedString}"
    >
    </wizard-textfield>`,
    ];
}
export function removeAccessPointWizard(element) {
    const references = deleteReferences(element);
    if (references.length > 0) {
        return [
            {
                title: get('accesspoint.wizard.title.delete'),
                content: renderAccessPointReferencesWizard(references),
                primary: {
                    icon: 'delete',
                    label: get('remove'),
                    action: removeAccessPointAndReferences(element),
                },
            },
        ];
    }
    return null;
}
export function editAccessPointWizard(element) {
    const name = element.getAttribute('name');
    const desc = element.getAttribute('desc');
    return [
        {
            title: get('accesspoint.wizard.title.edit'),
            element,
            primary: {
                icon: 'edit',
                label: get('save'),
                action: updateNamingAttributeWithReferencesAction(element, 'accesspoint.action.updateAccessPoint'),
            },
            content: renderAccessPointWizard(name, desc, reservedNamesAccessPoint(element)),
        },
    ];
}
function renderAccessPointReferencesWizard(references) {
    return [
        html ` <section>
      <h3 style="margin: 0;">${get('accesspoint.wizard.title.references')}</h3>
      <mwc-list>
        ${references.map(reference => {
            const oldElement = reference.old.element;
            return html ` <mwc-list-item noninteractive twoline>
            <span>${oldElement.tagName}</span>
            <span slot="secondary"
              >${identity(reference.old.element)}</span
            >
          </mwc-list-item>`;
        })}
      </mwc-list>
    </section>`,
    ];
}
function reservedNamesAccessPoint(currentElement) {
    const ied = currentElement.closest('IED');
    if (!ied)
        return [];
    return Array.from(ied.querySelectorAll(':scope > AccessPoint'))
        .filter(isPublic)
        .map(ap => ap.getAttribute('name') ?? '')
        .filter(name => name !== currentElement.getAttribute('name'));
}
export function removeAccessPointAndReferences(element) {
    return (inputs, wizard) => {
        wizard.dispatchEvent(newWizardEvent());
        const referencesDeleteActions = deleteReferences(element);
        const name = element.getAttribute('name') ?? 'Unknown';
        const complexAction = {
            actions: [],
            title: get('ied.action.deleteAccessPoint', { name }),
        };
        complexAction.actions.push({
            old: { parent: element.parentElement, element },
        });
        complexAction.actions.push(...referencesDeleteActions);
        return [complexAction];
    };
}
//# sourceMappingURL=accesspoint.js.map