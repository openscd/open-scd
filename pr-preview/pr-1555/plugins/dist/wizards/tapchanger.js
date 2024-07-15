import { html } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { cloneElement, createElement, getChildElementsByTagName, } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { getValue, } from '../../../openscd/src/foundation.js';
function createTapChangerAction(parent) {
    return (inputs) => {
        const tapChangerAttrs = {};
        const tapChangerKeys = ['name', 'desc', 'type', 'virtual'];
        tapChangerKeys.forEach(key => {
            tapChangerAttrs[key] = getValue(inputs.find(i => i.label === key));
        });
        const tapChanger = createElement(parent.ownerDocument, 'TapChanger', tapChangerAttrs);
        return [{ new: { parent, element: tapChanger } }];
    };
}
function updateTapChangerAction(element) {
    return (inputs) => {
        const tapChangerAttrs = {};
        const tapChangerKeys = ['name', 'desc', 'type', 'virtual'];
        tapChangerKeys.forEach(key => {
            tapChangerAttrs[key] = getValue(inputs.find(i => i.label === key));
        });
        if (tapChangerKeys.some(key => tapChangerAttrs[key] !== element.getAttribute(key))) {
            const newElement = cloneElement(element, tapChangerAttrs);
            return [
                {
                    old: { element },
                    new: { element: newElement },
                },
            ];
        }
        return [];
    };
}
export function contentTapChangerWizard(content) {
    return [
        html `<wizard-textfield
      label="name"
      .maybeValue=${content.name}
      helper="${get('scl.name')}"
      required
      validationMessage="${get('textfield.required')}"
      .reservedValues=${content.reservedNames}
      dialogInitialFocus
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="desc"
      .maybeValue=${content.desc}
      nullable
      helper="${get('scl.desc')}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="type"
      .maybeValue=${content.type}
      disabled
      helper="${get('scl.type')}"
    ></wizard-textfield>`,
        html `<wizard-checkbox
      label="virtual"
      .maybeValue=${content.virtual}
      helper="${get('scl.virtual')}"
      nullable
    ></wizard-checkbox>`,
    ];
}
export function createTapChangerWizard(parent) {
    const name = '';
    const desc = null;
    const type = 'LTC';
    const virtual = null;
    const reservedNames = Array.from(parent.querySelectorAll('TapChanger')).map(TapChanger => TapChanger.getAttribute('name'));
    return [
        {
            title: get('wizard.title.add', { tagName: 'TapChanger' }),
            primary: {
                icon: 'save',
                label: get('save'),
                action: createTapChangerAction(parent),
            },
            content: [
                ...contentTapChangerWizard({
                    name,
                    desc,
                    type,
                    virtual,
                    reservedNames,
                }),
            ],
        },
    ];
}
export function editTapChangerWizard(element) {
    const name = element.getAttribute('name');
    const desc = element.getAttribute('desc');
    const type = element.getAttribute('type');
    const virtual = element.getAttribute('virtual');
    const reservedNames = getChildElementsByTagName(element.parentElement, 'TapChanger')
        .filter(sibling => sibling !== element)
        .map(sibling => sibling.getAttribute('name'));
    return [
        {
            title: get('wizard.title.edit', { tagName: 'TapChanger' }),
            primary: {
                icon: 'save',
                label: get('save'),
                action: updateTapChangerAction(element),
            },
            content: [
                ...contentTapChangerWizard({
                    name,
                    desc,
                    type,
                    virtual,
                    reservedNames,
                }),
            ],
        },
    ];
}
//# sourceMappingURL=tapchanger.js.map