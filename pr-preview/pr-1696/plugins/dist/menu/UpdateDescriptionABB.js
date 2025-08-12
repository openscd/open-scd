import { html, LitElement } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js';
import '../../../openscd/src/filtered-list.js';
import { find, identity, isPublic, newWizardEvent, } from '../../../openscd/src/foundation.js';
import { cloneElement } from '../../../_snowpack/link/packages/xml/dist/index.js';
function addDescriptionAction(doc) {
    return (_, wizard, list) => {
        const selectedItems = list.selected;
        const actions = selectedItems.map(item => {
            const desc = item.querySelector('span').textContent;
            const [tag, identity] = item.value.split(' | ');
            const oldElement = find(doc, tag, identity);
            const newElement = cloneElement(oldElement, { desc });
            return { old: { element: oldElement }, new: { element: newElement } };
        });
        return [
            {
                title: get('updatedesc.abb'),
                actions,
            },
        ];
    };
}
function createLogWizard(doc, items) {
    return [
        {
            title: get('wizard.title.add', { tagName: 'desc' }),
            primary: {
                label: get('save'),
                icon: 'save',
                action: addDescriptionAction(doc),
            },
            content: [
                html `<filtered-list multi
          >${Array.from(items.map(item => html `<mwc-check-list-item
                  twoline
                  selected
                  value="${item.tag + ' | ' + item.identity}"
                  ><span>${item.desc}</span
                  ><span slot="secondary"
                    >${item.tag + ' | ' + item.identity}</span
                  ></mwc-check-list-item
                >`))}</filtered-list
        >`,
            ],
        },
    ];
}
function addDescriptionToABB(ied) {
    return Array.from(ied.getElementsByTagName('ExtRef'))
        .filter(element => isPublic(element))
        .filter(extRef => extRef.getAttribute('intAddr'))
        .map(extRef => {
        const intAddr = extRef.getAttribute('intAddr');
        const internalMapping = intAddr.split(',')[3]; //this might change as is vendor dependant!!
        const oldDesc = extRef.getAttribute('desc');
        const newDesc = oldDesc
            ? oldDesc + '-' + internalMapping
            : internalMapping;
        return {
            desc: newDesc,
            tag: 'ExtRef',
            identity: identity(extRef),
        };
    });
}
/** Plug-in that enriched ExtRefs desc attribute based on intAddr attribute (ABB)*/
export default class UpdateDescriptionAbb extends LitElement {
    /** Entry point for this plug-in */
    async run() {
        const items = Array.from(this.doc.querySelectorAll(':root > IED')).flatMap(ied => addDescriptionToABB(ied));
        this.dispatchEvent(newWizardEvent(createLogWizard(this.doc, items)));
    }
}
//# sourceMappingURL=UpdateDescriptionABB.js.map