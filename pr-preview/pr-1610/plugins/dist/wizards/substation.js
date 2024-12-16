import { html } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-checkbox.js';
import '../../../_snowpack/pkg/@material/mwc-formfield.js';
import { createElement } from '../../../_snowpack/link/packages/xml/dist/index.js';
import '../../../openscd/src/wizard-textfield.js';
import { getValue, } from '../../../openscd/src/foundation.js';
import { guessVoltageLevel } from '../editors/substation/guess-wizard.js';
import { updateNamingAttributeWithReferencesAction } from './foundation/actions.js';
function render(name, desc, guessable) {
    return [
        html `<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get('substation.wizard.nameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get('substation.wizard.descHelper')}"
    ></wizard-textfield>`,
        guessable
            ? html `<mwc-formfield label="${get('guess.wizard.primary')}">
          <mwc-checkbox></mwc-checkbox>
        </mwc-formfield>`
            : html ``,
    ];
}
export function createAction(parent) {
    return (inputs, wizard) => {
        const name = getValue(inputs.find(i => i.label === 'name'));
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        const guess = wizard.shadowRoot?.querySelector('mwc-checkbox')?.checked;
        parent.ownerDocument.createElement('Substation');
        const substation = createElement(parent.ownerDocument, 'Substation', {
            name,
            desc,
        });
        if (guess)
            return [() => guessVoltageLevel(parent.ownerDocument, substation)];
        return [{ new: { parent, element: substation } }];
    };
}
export function createSubstationWizard(parent) {
    const guessable = parent.ownerDocument.querySelector('Substation') === null &&
        parent.tagName === 'SCL';
    return [
        {
            title: get('substation.wizard.title.add'),
            element: undefined,
            primary: {
                icon: 'add',
                label: get('add'),
                action: createAction(parent),
            },
            content: render('', '', guessable),
        },
    ];
}
export function substationEditWizard(element) {
    return [
        {
            title: get('substation.wizard.title.edit'),
            element,
            primary: {
                icon: 'edit',
                label: get('save'),
                action: updateNamingAttributeWithReferencesAction(element, 'substation.action.updatesubstation'),
            },
            content: render(element.getAttribute('name') ?? '', element.getAttribute('desc'), false),
        },
    ];
}
//# sourceMappingURL=substation.js.map