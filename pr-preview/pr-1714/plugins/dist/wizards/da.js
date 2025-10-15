import { html } from '../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../openscd/src/wizard-checkbox.js';
import '../../../openscd/src/wizard-select.js';
import { getValue, isPublic, newWizardEvent, } from '../../../openscd/src/foundation.js';
import { cloneElement, createElement, } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { getValAction, wizardContent } from './abstractda.js';
import { functionalConstraintEnum } from './foundation/enums.js';
function remove(element) {
    return (wizard) => {
        wizard.dispatchEvent(newActionEvent({ old: { parent: element.parentElement, element } }));
        wizard.dispatchEvent(newWizardEvent());
    };
}
export function renderDa(fc, dchg, qchg, dupd) {
    return [
        html `<wizard-select
      label="fc"
      .maybeValue=${fc}
      helper="${get('scl.fc')}"
      required
      fixedMenuPosition
      >${functionalConstraintEnum.map(fcOption => html `<mwc-list-item value="${fcOption}">${fcOption}</mwc-list-item>`)}</wizard-select
    >`,
        html `<wizard-checkbox
      label="dchg"
      .maybeValue=${dchg}
      helper="${get('scl.dchg')}"
      nullable
    ></wizard-checkbox>`,
        html `<wizard-checkbox
      label="qchg"
      .maybeValue=${qchg}
      helper="${get('scl.qchg')}"
      nullable
    ></wizard-checkbox>`,
        html `<wizard-checkbox
      label="dupd"
      .maybeValue=${dupd}
      helper="${get('scl.dupd')}"
      nullable
    ></wizard-checkbox>`,
    ];
}
export function updateDaAction(element) {
    return (inputs) => {
        const name = getValue(inputs.find(i => i.label === 'name'));
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        const bType = getValue(inputs.find(i => i.label === 'bType'));
        const type = bType === 'Enum' || bType === 'Struct'
            ? getValue(inputs.find(i => i.label === 'type'))
            : null;
        const sAddr = getValue(inputs.find(i => i.label === 'sAddr'));
        const valKind = getValue(inputs.find(i => i.label === 'valKind'));
        const valImport = getValue(inputs.find(i => i.label === 'valImport'));
        const valField = inputs.find(i => i.label === 'Val' && i.style.display !== 'none');
        const Val = valField ? getValue(valField) : null;
        const fc = getValue(inputs.find(i => i.label === 'fc')) ?? '';
        const dchg = getValue(inputs.find(i => i.label === 'dchg'));
        const qchg = getValue(inputs.find(i => i.label === 'qchg'));
        const dupd = getValue(inputs.find(i => i.label === 'dupd'));
        let daAction;
        let valAction;
        if (name === element.getAttribute('name') &&
            desc === element.getAttribute('desc') &&
            bType === element.getAttribute('bType') &&
            type === element.getAttribute('type') &&
            sAddr === element.getAttribute('sAddr') &&
            valKind === element.getAttribute('valKind') &&
            valImport === element.getAttribute('valImprot') &&
            fc === element.getAttribute('fc') &&
            dchg === element.getAttribute('dchg') &&
            qchg === element.getAttribute('qchg') &&
            dupd === element.getAttribute('dupd')) {
            daAction = null;
        }
        else {
            const newElement = cloneElement(element, {
                name,
                desc,
                bType,
                type,
                sAddr,
                valKind,
                valImport,
                fc,
                dchg,
                qchg,
                dupd,
            });
            daAction = { old: { element }, new: { element: newElement } };
        }
        if (Val === (element.querySelector('Val')?.textContent?.trim() ?? null)) {
            valAction = null;
        }
        else {
            valAction = getValAction(element.querySelector('Val'), Val, daAction?.new.element ?? element);
        }
        const actions = [];
        if (daAction)
            actions.push(daAction);
        if (valAction)
            actions.push(valAction);
        return actions;
    };
}
export function editDAWizard(element) {
    const doc = element.ownerDocument;
    const name = element.getAttribute('name');
    const desc = element.getAttribute('desc');
    const bType = element.getAttribute('bType') ?? '';
    const type = element.getAttribute('type');
    const sAddr = element.getAttribute('sAddr');
    const Val = element.querySelector('Val')?.innerHTML.trim() ?? null;
    const valKind = element.getAttribute('valKind');
    const valImport = element.getAttribute('valImport');
    const fc = element.getAttribute('fc') ?? '';
    const dchg = element.getAttribute('dchg');
    const qchg = element.getAttribute('qchg');
    const dupd = element.getAttribute('dupd');
    const types = Array.from(doc.querySelectorAll('DAType, EnumType'))
        .filter(isPublic)
        .filter(type => type.getAttribute('id'));
    const data = element.closest('DataTypeTemplates');
    return [
        {
            title: get('da.wizard.title.edit'),
            element: element ?? undefined,
            primary: {
                icon: '',
                label: get('save'),
                action: updateDaAction(element),
            },
            menuActions: [
                {
                    icon: 'delete',
                    label: get('remove'),
                    action: remove(element),
                },
            ],
            content: [
                ...wizardContent(name, desc, bType, types, type, sAddr, valKind, valImport, Val, data),
                ...renderDa(fc, dchg, qchg, dupd),
            ],
        },
    ];
}
export function createDaAction(parent) {
    return (inputs) => {
        const name = getValue(inputs.find(i => i.label === 'name'));
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        const bType = getValue(inputs.find(i => i.label === 'bType'));
        const type = bType === 'Enum' || bType === 'Struct'
            ? getValue(inputs.find(i => i.label === 'type'))
            : null;
        const sAddr = getValue(inputs.find(i => i.label === 'sAddr'));
        const valKind = getValue(inputs.find(i => i.label === 'valKind'));
        const valImport = getValue(inputs.find(i => i.label === 'valImport'));
        const valField = inputs.find(i => i.label === 'Val' && i.style.display !== 'none');
        const Val = valField ? getValue(valField) : null;
        const fc = getValue(inputs.find(i => i.label === 'fc')) ?? '';
        const dchg = getValue(inputs.find(i => i.label === 'dchg'));
        const qchg = getValue(inputs.find(i => i.label === 'qchg'));
        const dupd = getValue(inputs.find(i => i.label === 'dupd'));
        const actions = [];
        const element = createElement(parent.ownerDocument, 'DA', {
            name,
            desc,
            bType,
            type,
            sAddr,
            valKind,
            valImport,
            fc,
            dchg,
            qchg,
            dupd,
        });
        if (Val !== null) {
            const valElement = createElement(parent.ownerDocument, 'Val', {});
            valElement.textContent = Val;
            element.appendChild(valElement);
        }
        actions.push({
            new: {
                parent,
                element,
            },
        });
        return actions;
    };
}
export function createDaWizard(element) {
    const doc = element.ownerDocument;
    const name = '';
    const desc = null;
    const bType = '';
    const type = null;
    const sAddr = null;
    const Val = null;
    const valKind = null;
    const valImport = null;
    const fc = '';
    const dchg = null;
    const qchg = null;
    const dupd = null;
    const types = Array.from(doc.querySelectorAll('DAType, EnumType'))
        .filter(isPublic)
        .filter(type => type.getAttribute('id'));
    const data = element.closest('DataTypeTemplates');
    return [
        {
            title: get('da.wizard.title.edit'),
            primary: {
                icon: '',
                label: get('save'),
                action: createDaAction(element),
            },
            content: [
                ...wizardContent(name, desc, bType, types, type, sAddr, valKind, valImport, Val, data),
                ...renderDa(fc, dchg, qchg, dupd),
            ],
        },
    ];
}
//# sourceMappingURL=da.js.map