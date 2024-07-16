import { html } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../openscd/src/wizard-textfield.js';
import { getValue, } from '../../../openscd/src/foundation.js';
import { cloneElement } from '../../../_snowpack/link/packages/xml/dist/index.js';
export function renderLN0Wizard(lnType, desc, lnClass, inst) {
    return [
        html `<wizard-textfield
      label="lnType"
      .maybeValue=${lnType}
      required
      helper="${get('ln0.wizard.lnTypeHelper')}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get('ln0.wizard.descHelper')}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="lnClass"
      required
      .maybeValue=${lnClass}
      helper="${get('ln0.wizard.lnClassHelper')}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="inst"
      .maybeValue=${inst}
      helper="${get('ln0.wizard.instHelper')}"
    ></wizard-textfield>`,
    ];
}
function updateAction(element) {
    return (inputs) => {
        const ldAttrs = {};
        const ldKeys = ['lnType', 'desc', 'lnClass', 'inst'];
        ldKeys.forEach(key => {
            ldAttrs[key] = getValue(inputs.find(i => i.label === key));
        });
        if (ldKeys.some(key => ldAttrs[key] !== element.getAttribute(key))) {
            const newElement = cloneElement(element, ldAttrs);
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
export function editLN0Wizard(element) {
    return [
        {
            title: get('ln0.wizard.title.edit'),
            element,
            primary: {
                icon: 'edit',
                label: get('save'),
                action: updateAction(element),
            },
            content: renderLN0Wizard(element.getAttribute('lnType'), element.getAttribute('desc'), element.getAttribute('lnClass'), element.getAttribute('inst')),
        },
    ];
}
//# sourceMappingURL=ln0.js.map