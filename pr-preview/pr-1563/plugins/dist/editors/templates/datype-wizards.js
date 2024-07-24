import { html } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../../_snowpack/pkg/@material/mwc-select.js';
import '../../../../openscd/src/wizard-textfield.js';
import { find, getValue, identity, newSubWizardEvent, newWizardEvent, patterns, } from '../../../../openscd/src/foundation.js';
import { cloneElement, createElement } from '../../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent, } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { createBDAWizard, editBDAWizard } from '../../wizards/bda.js';
import { addReferencedDataTypes, allDataTypeSelector, unifyCreateActionArray, } from './foundation.js';
function remove(element) {
    return (wizard) => {
        wizard.dispatchEvent(newActionEvent({ old: { parent: element.parentElement, element } }));
        wizard.dispatchEvent(newWizardEvent());
    };
}
function openAddBda(parent) {
    return (wizard) => {
        wizard.dispatchEvent(newSubWizardEvent(() => createBDAWizard(parent)));
    };
}
function updateDATpyeAction(element) {
    return (inputs) => {
        const id = getValue(inputs.find(i => i.label === 'id'));
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        if (id === element.getAttribute('id') &&
            desc === element.getAttribute('desc'))
            return [];
        const newElement = cloneElement(element, { id, desc });
        const actions = [];
        actions.push({ old: { element }, new: { element: newElement } });
        const oldId = element.getAttribute('id');
        Array.from(element.ownerDocument.querySelectorAll(`DOType > DA[type="${oldId}"], DAType > BDA[type="${oldId}"]`)).forEach(oldDa => {
            const newDa = oldDa.cloneNode(false);
            newDa.setAttribute('type', id);
            actions.push({ old: { element: oldDa }, new: { element: newDa } });
        });
        return [
            { title: get('datype.action.edit', { oldId, newId: id }), actions },
        ];
    };
}
export function editDaTypeWizard(dATypeIdentity, doc) {
    const datype = find(doc, 'DAType', dATypeIdentity);
    if (!datype)
        return undefined;
    const id = datype.getAttribute('id');
    const desc = datype.getAttribute('desc');
    return [
        {
            title: get('datype.wizard.title.edit'),
            element: datype ?? undefined,
            primary: {
                icon: '',
                label: get('save'),
                action: updateDATpyeAction(datype),
            },
            menuActions: [
                {
                    label: get('remove'),
                    icon: 'delete',
                    action: remove(datype),
                },
                {
                    label: get('scl.DA'),
                    icon: 'playlist_add',
                    action: openAddBda(datype),
                },
            ],
            content: [
                html `<wizard-textfield
          label="id"
          helper="${get('scl.id')}"
          .maybeValue=${id}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
                html `<wizard-textfield
          label="desc"
          helper="${get('scl.desc')}"
          .maybeValue=${desc}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
                html `<mwc-list
          style="margin-top: 0px;"
          @selected=${(e) => {
                    const bdaIdentity = e.target.selected.value;
                    const bda = find(doc, 'BDA', bdaIdentity);
                    if (bda)
                        e.target.dispatchEvent(newSubWizardEvent(editBDAWizard(bda)));
                }}
        >
          ${Array.from(datype.querySelectorAll('BDA')).map(bda => html `<mwc-list-item twoline tabindex="0" value="${identity(bda)}"
                ><span>${bda.getAttribute('name')}</span
                ><span slot="secondary"
                  >${bda.getAttribute('bType') === 'Enum' ||
                    bda.getAttribute('bType') === 'Struct'
                    ? '#' + bda.getAttribute('type')
                    : bda.getAttribute('bType')}</span
                ></mwc-list-item
              >`)}
        </mwc-list> `,
            ],
        },
    ];
}
function addPredefinedDAType(parent, templates) {
    return (inputs) => {
        const id = getValue(inputs.find(i => i.label === 'id'));
        if (!id)
            return [];
        const existId = Array.from(templates.querySelectorAll(allDataTypeSelector)).some(type => type.getAttribute('id') === id);
        if (existId)
            return [];
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        const values = inputs.find(i => i.label === 'values');
        const selectedElement = values.selected
            ? templates.querySelector(`DAType[id="${values.selected.value}"]`)
            : null;
        const element = values.selected
            ? selectedElement.cloneNode(true)
            : createElement(parent.ownerDocument, 'DAType', {});
        element.setAttribute('id', id);
        if (desc)
            element.setAttribute('desc', desc);
        const actions = [];
        if (selectedElement)
            addReferencedDataTypes(selectedElement, parent).forEach(action => actions.push(action));
        actions.push({
            new: {
                parent,
                element,
            },
        });
        return unifyCreateActionArray(actions);
    };
}
export function createDATypeWizard(parent, templates) {
    return [
        {
            title: get('datype.wizard.title.add'),
            primary: {
                icon: 'add',
                label: get('add'),
                action: addPredefinedDAType(parent, templates),
            },
            content: [
                html `<mwc-select
          fixedMenuPosition
          outlined
          icon="playlist_add_check"
          label="values"
          helper="Default enumerations"
        >
          ${Array.from(templates.querySelectorAll('DAType')).map(datype => html `<mwc-list-item
                graphic="icon"
                hasMeta
                value="${datype.getAttribute('id') ?? ''}"
                ><span
                  >${datype.getAttribute('id')?.replace('OpenSCD_', '')}</span
                >
                <span slot="meta"
                  >${datype.querySelectorAll('BDA').length}</span
                >
              </mwc-list-item>`)}
        </mwc-select>`,
                html `<wizard-textfield
          label="id"
          helper="${get('scl.id')}"
          .maybeValue=${''}
          required
          maxlength="255"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
                html `<wizard-textfield
          label="desc"
          helper="${get('scl.desc')}"
          .maybeValue=${null}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
            ],
        },
    ];
}
//# sourceMappingURL=datype-wizards.js.map