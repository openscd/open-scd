import { html } from '../../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../../_snowpack/pkg/lit-translate.js';
import { getMultiplier, getValue, patterns, } from '../../../../../openscd/src/foundation.js';
import { createElement } from '../../../../../_snowpack/link/packages/xml/dist/index.js';
import '../../../../../openscd/src/wizard-textfield.js';
/** Initial attribute values suggested for `SubNetwork` creation for the 104 plugin */
const initial = {
    type: '104',
    bitrate: '100',
    multiplier: 'M',
};
function contentSubNetwork(options) {
    return [
        html `<wizard-textfield
      label="name"
      .maybeValue=${options.name}
      helper="${get('subnetwork.wizard.nameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
      helper="${get('subnetwork.wizard.descHelper')}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="type"
      .maybeValue=${options.type}
      nullable
      helper="${get('subnetwork.wizard.typeHelper')}"
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="BitRate"
      .maybeValue=${options.BitRate}
      nullable
      unit="b/s"
      .multipliers=${[null, 'M']}
      .multiplier=${options.multiplier}
      helper="${get('subnetwork.wizard.bitrateHelper')}"
      required
      validationMessage="${get('textfield.nonempty')}"
      pattern="${patterns.decimal}"
    ></wizard-textfield>`,
    ];
}
export function createSubNetworkAction(parent) {
    return (inputs) => {
        const name = getValue(inputs.find(i => i.label === 'name'));
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        const type = getValue(inputs.find(i => i.label === 'type'));
        const BitRate = getValue(inputs.find(i => i.label === 'BitRate'));
        const multiplier = getMultiplier(inputs.find(i => i.label === 'BitRate'));
        const element = createElement(parent.ownerDocument, 'SubNetwork', {
            name,
            desc,
            type,
        });
        if (BitRate !== null) {
            const bitRateElement = createElement(parent.ownerDocument, 'BitRate', {
                unit: 'b/s',
                multiplier,
            });
            bitRateElement.textContent = BitRate;
            element.appendChild(bitRateElement);
        }
        const action = {
            new: {
                parent,
                element,
            },
        };
        return [action];
    };
}
export function createSubNetworkWizard(parent) {
    return [
        {
            title: get('wizard.title.add', { tagName: 'SubNetwork' }),
            primary: {
                icon: 'add',
                label: get('add'),
                action: createSubNetworkAction(parent),
            },
            content: contentSubNetwork({
                name: '',
                desc: '',
                type: initial.type,
                BitRate: initial.bitrate,
                multiplier: initial.multiplier,
            }),
        },
    ];
}
//# sourceMappingURL=subnetwork.js.map