import { html } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../openscd/src/wizard-textfield.js';
import { getValue, identity, } from '../../../openscd/src/foundation.js';
import { createElement } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { contentGseOrSmvWizard, updateAddress } from './address.js';
export function getMTimeAction(type, oldTime, Time, gse) {
    if (oldTime === null) {
        const element = createElement(gse.ownerDocument, type, {
            unit: 's',
            multiplier: 'm',
        });
        element.textContent = Time;
        return {
            new: {
                parent: gse,
                element,
                reference: gse.firstElementChild,
            },
        };
    }
    if (Time === null)
        return {
            old: {
                parent: gse,
                element: oldTime,
                reference: oldTime.nextSibling,
            },
        };
    const newTime = oldTime.cloneNode(false);
    newTime.textContent = Time;
    return {
        old: { element: oldTime },
        new: { element: newTime },
    };
}
export function updateGSEAction(element) {
    return (inputs, wizard) => {
        const complexAction = {
            actions: [],
            title: get('gse.action.addaddress', {
                identity: identity(element),
            }),
        };
        const instType = wizard.shadowRoot?.querySelector('#instType')?.checked ??
            false;
        const addressContent = {};
        addressContent['MAC-Address'] = getValue(inputs.find(i => i.label === 'MAC-Address'));
        addressContent['APPID'] = getValue(inputs.find(i => i.label === 'APPID'));
        addressContent['VLAN-ID'] = getValue(inputs.find(i => i.label === 'VLAN-ID'));
        addressContent['VLAN-PRIORITY'] = getValue(inputs.find(i => i.label === 'VLAN-PRIORITY'));
        const addressActions = updateAddress(element, addressContent, instType);
        addressActions.forEach(action => {
            complexAction.actions.push(action);
        });
        const MinTime = getValue(inputs.find(i => i.label === 'MinTime'));
        const MaxTime = getValue(inputs.find(i => i.label === 'MaxTime'));
        if (MinTime !==
            (element.querySelector('MinTime')?.textContent?.trim() ?? null)) {
            complexAction.actions.push(getMTimeAction('MinTime', element.querySelector('MinTime'), MinTime, element));
        }
        if (MaxTime !==
            (element.querySelector('MaxTime')?.textContent?.trim() ?? null)) {
            complexAction.actions.push(getMTimeAction('MaxTime', element.querySelector('MaxTime'), MaxTime, element));
        }
        return [complexAction];
    };
}
export function editGseWizard(element) {
    const minTime = element.querySelector('MinTime')?.innerHTML.trim() ?? null;
    const maxTime = element.querySelector('MaxTime')?.innerHTML.trim() ?? null;
    const hasInstType = Array.from(element.querySelectorAll('Address > P')).some(pType => pType.getAttribute('xsi:type'));
    const attributes = {};
    ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(key => {
        if (!attributes[key])
            attributes[key] =
                element.querySelector(`Address > P[type="${key}"]`)?.innerHTML.trim() ??
                    null;
    });
    return [
        {
            title: get('wizard.title.edit', { tagName: element.tagName }),
            element,
            primary: {
                label: get('save'),
                icon: 'save',
                action: updateGSEAction(element),
            },
            content: [
                ...contentGseOrSmvWizard({ hasInstType, attributes }),
                html `<wizard-textfield
          label="MinTime"
          .maybeValue=${minTime}
          nullable
          suffix="ms"
          type="number"
        ></wizard-textfield>`,
                html `<wizard-textfield
          label="MaxTime"
          .maybeValue=${maxTime}
          nullable
          suffix="ms"
          type="number"
        ></wizard-textfield>`,
            ],
        },
    ];
}
//# sourceMappingURL=gse.js.map