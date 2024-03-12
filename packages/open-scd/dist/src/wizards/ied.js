import { html } from 'lit';
import { get, translate } from 'lit-translate';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '../wizard-textfield.js';
import { identity, isPublic, newActionEvent, newSubWizardEvent, newWizardEvent, } from '../foundation.js';
import { patterns } from './foundation/limits.js';
import { updateNamingAttributeWithReferencesAction } from './foundation/actions.js';
import { deleteReferences } from './foundation/references.js';
import { emptyInputsDeleteActions } from '../foundation/ied.js';
const iedNamePattern = '[A-Za-z][0-9A-Za-z_]{0,2}|' +
    '[A-Za-z][0-9A-Za-z_]{4,63}|' +
    '[A-MO-Za-z][0-9A-Za-z_]{3}|' +
    'N[0-9A-Za-np-z_][0-9A-Za-z_]{2}|' +
    'No[0-9A-Za-mo-z_][0-9A-Za-z_]|' +
    'Non[0-9A-Za-df-z_]';
export function renderIEDWizard(name, desc, type, manufacturer, configVersion, originalSclVersion, engRight, owner, reservedNames) {
    return [
        html `<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('ied.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
      pattern="${iedNamePattern}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('ied.wizard.descHelper')}"
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="type"
      .maybeValue=${type || '-'}
      readOnly
      disabled
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="manufacturer"
      .maybeValue=${manufacturer || '-'}
      readOnly
      disabled
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="configVersion"
      .maybeValue=${configVersion || '-'}
      readOnly
      disabled
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="originalSclVersion"
      .maybeValue=${originalSclVersion || '-'}
      readOnly
      disabled
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="engRight"
      .maybeValue=${engRight || '-'}
      readOnly
      disabled
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="owner"
      .maybeValue=${owner || '-'}
      readOnly
      disabled
    ></wizard-textfield>`,
    ];
}
function renderIEDReferencesWizard(references) {
    return [
        html ` <section>
      <h1>${translate('ied.wizard.title.references')}</h1>
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
function validatedVersionAttribute(element) {
    return (element.getAttribute('originalSclVersion') ?? '')
        .concat(element.getAttribute('originalSclRevision') ?? '')
        .concat(element.getAttribute('originalSclRelease') ?? '');
}
export function reservedNamesIED(currentElement) {
    return Array.from(currentElement.parentNode.querySelectorAll('IED'))
        .filter(isPublic)
        .map(ied => ied.getAttribute('name') ?? '')
        .filter(name => name !== currentElement.getAttribute('name'));
}
export function removeIEDAndReferences(element) {
    return (inputs, wizard) => {
        // Close Edit Wizard, if open.
        wizard.dispatchEvent(newWizardEvent());
        // Get Delete Actions for other elements that also need to be removed
        const referencesDeleteActions = deleteReferences(element);
        // Use the ExtRef Elements to check if after removing the ExtRef there are empty Inputs that can also be removed.
        const extRefsDeleteActions = referencesDeleteActions.filter(deleteAction => deleteAction.old.element.tagName === 'ExtRef');
        const inputsDeleteActions = emptyInputsDeleteActions(extRefsDeleteActions);
        // Create Complex Action to remove IED and all references.
        const name = element.getAttribute('name') ?? 'Unknown';
        const complexAction = {
            actions: [],
            title: get('ied.action.deleteied', { name }),
        };
        complexAction.actions.push({
            old: { parent: element.parentElement, element },
        });
        complexAction.actions.push(...referencesDeleteActions);
        complexAction.actions.push(...inputsDeleteActions);
        return [complexAction];
    };
}
export function removeIEDWizard(element) {
    // Check if the IED has any references, if so show wizard with all references.
    const references = deleteReferences(element);
    if (references.length > 0) {
        return [
            {
                title: get('ied.wizard.title.delete'),
                content: renderIEDReferencesWizard(references),
                primary: {
                    icon: 'delete',
                    label: get('remove'),
                    action: removeIEDAndReferences(element),
                },
            },
        ];
    }
    return null;
}
export function editIEDWizard(element) {
    function removeIED(element) {
        return (wizard) => {
            const removeWizard = removeIEDWizard(element);
            if (removeWizard)
                wizard.dispatchEvent(newSubWizardEvent(() => removeWizard));
            // If no Wizard is needed, just remove the element.
            wizard.dispatchEvent(newActionEvent({ old: { parent: element.parentElement, element } }));
            wizard.dispatchEvent(newWizardEvent());
        };
    }
    return [
        {
            title: get('ied.wizard.title.edit'),
            element,
            menuActions: [
                {
                    icon: 'delete',
                    label: get('remove'),
                    action: removeIED(element),
                },
            ],
            primary: {
                icon: 'edit',
                label: get('save'),
                action: updateNamingAttributeWithReferencesAction(element, 'ied.action.updateied'),
            },
            content: renderIEDWizard(element.getAttribute('name'), element.getAttribute('desc'), element.getAttribute('type'), element.getAttribute('manufacturer'), element.getAttribute('configVersion'), validatedVersionAttribute(element), element.getAttribute('engRight'), element.getAttribute('owner'), reservedNamesIED(element)),
        },
    ];
}
//# sourceMappingURL=ied.js.map