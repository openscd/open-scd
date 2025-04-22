import { html } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { getValue, isPublic, } from '../../../openscd/src/foundation.js';
import { createElement, } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { replaceNamingAction } from './foundation/actions.js';
const defaultPowerTransformerType = 'PTR';
export function createAction(parent) {
    return (inputs) => {
        const name = getValue(inputs.find(i => i.label === 'name'));
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        const element = createElement(parent.ownerDocument, 'PowerTransformer', {
            name,
            desc,
            type: defaultPowerTransformerType,
        });
        const action = {
            new: {
                parent,
                element,
            },
        };
        return [action];
    };
}
export function renderPowerTransformerWizard(name, desc, type, reservedNames) {
    return [
        html `<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get('powertransformer.wizard.nameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get('powertransformer.wizard.descHelper')}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="type"
      .maybeValue=${type}
      disabled
      helper="${get('powertransformer.wizard.typeHelper')}"
    ></wizard-textfield>`,
    ];
}
export function reservedNamesPowerTransformer(parent, currentName) {
    return Array.from(parent.querySelectorAll('PowerTransformer'))
        .filter(isPublic)
        .map(pwt => pwt.getAttribute('name') ?? '')
        .filter(name => currentName && name !== currentName);
}
export function createPowerTransformerWizard(parent) {
    const reservedNames = reservedNamesPowerTransformer(parent);
    return [
        {
            title: get('powertransformer.wizard.title.add'),
            element: undefined,
            primary: {
                icon: '',
                label: get('add'),
                action: createAction(parent),
            },
            content: renderPowerTransformerWizard('', null, defaultPowerTransformerType, reservedNames),
        },
    ];
}
export function editPowerTransformerWizard(element) {
    const reservedNames = reservedNamesPowerTransformer(element.parentNode, element.getAttribute('name'));
    return [
        {
            title: get('powertransformer.wizard.title.edit'),
            element,
            primary: {
                icon: 'edit',
                label: get('save'),
                action: replaceNamingAction(element),
            },
            content: renderPowerTransformerWizard(element.getAttribute('name'), element.getAttribute('desc'), element.getAttribute('type'), reservedNames),
        },
    ];
}
//# sourceMappingURL=powertransformer.js.map