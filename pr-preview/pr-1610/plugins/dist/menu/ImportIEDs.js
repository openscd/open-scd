import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, LitElement, property, query, state, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js';
import '../../../_snowpack/pkg/@material/dialog.js';
import '../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../openscd/src/filtered-list.js';
import { find, identity, isPublic } from '../../../openscd/src/foundation.js';
import { createElement } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent, } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { newLogEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js';
function uniqueTemplateIedName(doc, ied) {
    const [manufacturer, type] = ['manufacturer', 'type'].map(attr => ied.getAttribute(attr)?.replace(/[^A-Za-z0-9_]/g, ''));
    const nameCore = manufacturer || type
        ? `${manufacturer ?? ''}${type ? '_' + type : ''}`
        : 'TEMPLATE_IED';
    const siblingNames = Array.from(doc.querySelectorAll('IED'))
        .filter(isPublic)
        .map(child => child.getAttribute('name') ?? child.tagName);
    if (!siblingNames.length)
        return nameCore + '_001';
    let newName = '';
    for (let i = 0; i < siblingNames.length + 1; i++) {
        const newDigit = (i + 1).toString().padStart(3, '0');
        newName = nameCore + '_' + newDigit;
        if (!siblingNames.includes(newName))
            return newName;
    }
    return newName;
}
/**
 * Transfer namespaces from one element to another
 * @param destElement - Element to transfer namespaces to
 * @param sourceElement  - Element to transfer namespaces from
 */
function updateNamespaces(destElement, sourceElement) {
    Array.prototype.slice
        .call(sourceElement.attributes)
        .filter(attr => attr.name.startsWith('xmlns:'))
        .filter(attr => !destElement.hasAttribute(attr.name))
        .forEach(attr => {
        destElement.setAttributeNS('http://www.w3.org/2000/xmlns/', attr.name, attr.value);
    });
}
function getSubNetwork(elements, element) {
    const existElement = elements.find(item => item.getAttribute('name') === element.getAttribute('name'));
    return existElement ? existElement : element.cloneNode(false);
}
function addCommunicationElements(ied, doc) {
    const actions = [];
    const oldCommunicationElement = doc.querySelector(':root > Communication');
    const communication = oldCommunicationElement
        ? oldCommunicationElement
        : createElement(doc, 'Communication', {});
    if (!oldCommunicationElement)
        actions.push({
            new: {
                parent: doc.querySelector(':root'),
                element: communication,
            },
        });
    const connectedAPs = Array.from(ied.ownerDocument.querySelectorAll(`:root > Communication > SubNetwork > ConnectedAP[iedName="${ied.getAttribute('name')}"]`));
    const createdSubNetworks = [];
    connectedAPs.forEach(connectedAP => {
        const newSubNetwork = connectedAP.parentElement;
        const oldSubNetworkMatch = communication.querySelector(`:root > Communication > SubNetwork[name="${newSubNetwork.getAttribute('name')}"]`);
        const subNetwork = oldSubNetworkMatch
            ? oldSubNetworkMatch
            : getSubNetwork(createdSubNetworks, newSubNetwork);
        const element = connectedAP.cloneNode(true);
        if (!oldSubNetworkMatch && !createdSubNetworks.includes(subNetwork)) {
            actions.push({
                new: {
                    parent: communication,
                    element: subNetwork,
                },
            });
            createdSubNetworks.push(subNetwork);
        }
        actions.push({
            new: {
                parent: subNetwork,
                element,
            },
        });
    });
    return actions;
}
function hasConnectionToIed(type, ied) {
    const data = type.parentElement;
    const id = type.getAttribute('id');
    if (!data || !id)
        return false;
    if (type.tagName === 'EnumType')
        return Array.from(data.querySelectorAll(`DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`)).some(typeChild => hasConnectionToIed(typeChild.parentElement, ied));
    if (type.tagName === 'DAType')
        return Array.from(data.querySelectorAll(`DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`)).some(typeChild => hasConnectionToIed(typeChild.parentElement, ied));
    if (type.tagName === 'DOType')
        return Array.from(data.querySelectorAll(`LNodeType > DO[type="${id}"], DOType > SDO[type="${id}"]`)).some(typeChild => hasConnectionToIed(typeChild.parentElement, ied));
    return Array.from(ied.getElementsByTagName('LN0'))
        .concat(Array.from(ied.getElementsByTagName('LN')))
        .some(anyln => anyln.getAttribute('lnType') === id);
}
function addEnumType(ied, enumType, parent) {
    if (!hasConnectionToIed(enumType, ied))
        return;
    const existEnumType = parent.querySelector(`EnumType[id="${enumType.getAttribute('id')}"]`);
    if (existEnumType && enumType.isEqualNode(existEnumType))
        return;
    if (existEnumType) {
        // There is an `id` conflict in the project that must be resolved by
        // concatenating the IED name with the id
        const data = enumType.parentElement;
        const idOld = enumType.getAttribute('id');
        const idNew = ied.getAttribute('name') + idOld;
        enumType.setAttribute('id', idNew);
        data
            .querySelectorAll(`DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`)
            .forEach(type => type.setAttribute('type', idNew));
    }
    return {
        new: {
            parent,
            element: enumType,
        },
    };
}
function addDAType(ied, daType, parent) {
    if (!hasConnectionToIed(daType, ied))
        return;
    const existDAType = parent.querySelector(`DAType[id="${daType.getAttribute('id')}"]`);
    if (existDAType && daType.isEqualNode(existDAType))
        return;
    if (existDAType) {
        // There is an `id` conflict in the project that must be resolved by
        // concatenating the IED name with the id
        const data = daType.parentElement;
        const idOld = daType.getAttribute('id');
        const idNew = ied.getAttribute('name') + idOld;
        daType.setAttribute('id', idNew);
        data
            .querySelectorAll(`DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`)
            .forEach(type => type.setAttribute('type', idNew));
    }
    return {
        new: {
            parent,
            element: daType,
        },
    };
}
function addDOType(ied, doType, parent) {
    if (!hasConnectionToIed(doType, ied))
        return;
    const existDOType = parent.querySelector(`DOType[id="${doType.getAttribute('id')}"]`);
    if (existDOType && doType.isEqualNode(existDOType))
        return;
    if (existDOType) {
        // There is an `id` conflict in the project that must be resolved by
        // concatenating the IED name with the id
        const data = doType.parentElement;
        const idOld = doType.getAttribute('id');
        const idNew = ied.getAttribute('name') + idOld;
        doType.setAttribute('id', idNew);
        data
            .querySelectorAll(`LNodeType > DO[type="${idOld}"], DOType > SDO[type="${idOld}"]`)
            .forEach(type => type.setAttribute('type', idNew));
    }
    return {
        new: {
            parent,
            element: doType,
        },
    };
}
function addLNodeType(ied, lNodeType, parent) {
    if (!hasConnectionToIed(lNodeType, ied))
        return;
    const existLNodeType = parent.querySelector(`LNodeType[id="${lNodeType.getAttribute('id')}"]`);
    if (existLNodeType && lNodeType.isEqualNode(existLNodeType))
        return;
    if (existLNodeType) {
        // There is an `id` conflict in the project that must be resolved by
        // concatenating the IED name with the id
        const idOld = lNodeType.getAttribute('id');
        const idNew = ied.getAttribute('name').concat(idOld);
        lNodeType.setAttribute('id', idNew);
        Array.from(ied.querySelectorAll(`LN0[lnType="${idOld}"],LN[lnType="${idOld}"]`))
            .filter(isPublic)
            .forEach(ln => ln.setAttribute('lnType', idNew));
    }
    return {
        new: {
            parent,
            element: lNodeType,
        },
    };
}
function addDataTypeTemplates(ied, doc) {
    const actions = [];
    const dataTypeTemplates = doc.querySelector(':root > DataTypeTemplates')
        ? doc.querySelector(':root > DataTypeTemplates')
        : createElement(doc, 'DataTypeTemplates', {});
    if (!dataTypeTemplates.parentElement) {
        actions.push({
            new: {
                parent: doc.querySelector('SCL'),
                element: dataTypeTemplates,
            },
        });
    }
    ied.ownerDocument
        .querySelectorAll(':root > DataTypeTemplates > LNodeType')
        .forEach(lNodeType => actions.push(addLNodeType(ied, lNodeType, dataTypeTemplates)));
    ied.ownerDocument
        .querySelectorAll(':root > DataTypeTemplates > DOType')
        .forEach(doType => actions.push(addDOType(ied, doType, dataTypeTemplates)));
    ied.ownerDocument
        .querySelectorAll(':root > DataTypeTemplates > DAType')
        .forEach(daType => actions.push(addDAType(ied, daType, dataTypeTemplates)));
    ied.ownerDocument
        .querySelectorAll(':root > DataTypeTemplates > EnumType')
        .forEach(enumType => actions.push(addEnumType(ied, enumType, dataTypeTemplates)));
    return actions.filter(item => item !== undefined);
}
function isIedNameUnique(ied, doc) {
    const existingIedNames = Array.from(doc.querySelectorAll(':root > IED')).map(ied => ied.getAttribute('name'));
    const importedIedName = ied.getAttribute('name');
    if (existingIedNames.includes(importedIedName))
        return false;
    return true;
}
export default class ImportingIedPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.iedSelection = [];
    }
    async run() {
        this.iedSelection = [];
        this.pluginFileUI.click();
    }
    async docUpdate() {
        await this.updateComplete;
    }
    importIED(ied) {
        if (ied.getAttribute('name') === 'TEMPLATE') {
            const newIedName = uniqueTemplateIedName(this.doc, ied);
            ied.setAttribute('name', newIedName);
            Array.from(ied.ownerDocument.querySelectorAll(':root > Communication > SubNetwork > ConnectedAP[iedName="TEMPLATE"]')).forEach(connectedAp => connectedAp.setAttribute('iedName', newIedName));
        }
        if (!isIedNameUnique(ied, this.doc)) {
            this.dispatchEvent(newLogEvent({
                kind: 'error',
                title: get('import.log.nouniqueied', {
                    name: ied.getAttribute('name'),
                }),
            }));
            return;
        }
        // This doesn't provide redo/undo capability as it is not using the Editing
        // action API. To use it would require us to cache the full SCL file in
        // OpenSCD as it is now which could use significant memory.
        // TODO: In open-scd core update this to allow including in undo/redo.
        updateNamespaces(this.doc.documentElement, ied.ownerDocument.documentElement);
        const dataTypeTemplateActions = addDataTypeTemplates(ied, this.doc);
        const communicationActions = addCommunicationElements(ied, this.doc);
        const actions = communicationActions.concat(dataTypeTemplateActions);
        actions.push({
            new: {
                parent: this.doc.querySelector(':root'),
                element: ied,
            },
        });
        this.dispatchEvent(newActionEvent({
            title: get('editing.import', { name: ied.getAttribute('name') }),
            actions,
        }));
    }
    async importIEDs(importDoc, fileName) {
        const documentDialog = this.shadowRoot.querySelector(`mwc-dialog[data-file="${fileName}"]`);
        const selectedItems = (documentDialog.querySelector('filtered-list').selected);
        const ieds = selectedItems
            .map(item => {
            return find(importDoc, 'IED', item.value);
        })
            .filter(ied => ied);
        documentDialog.close();
        for (const ied of ieds) {
            this.importIED(ied);
            await this.docUpdate();
        }
    }
    async prepareImport(importDoc, fileName) {
        if (!importDoc) {
            this.dispatchEvent(newLogEvent({
                kind: 'error',
                title: get('import.log.loaderror'),
            }));
            return;
        }
        if (importDoc.querySelector('parsererror')) {
            this.dispatchEvent(newLogEvent({
                kind: 'error',
                title: get('import.log.parsererror'),
            }));
            return;
        }
        const ieds = Array.from(importDoc.querySelectorAll(':root > IED'));
        if (ieds.length === 0) {
            this.dispatchEvent(newLogEvent({
                kind: 'error',
                title: get('import.log.missingied'),
            }));
            return;
        }
        if (ieds.length === 1) {
            this.importIED(ieds[0]);
            return await this.docUpdate();
        }
        this.buildIedSelection(importDoc, fileName);
        await this.requestUpdate();
        const dialog = (this.shadowRoot.querySelector(`mwc-dialog[data-file="${fileName}"]`));
        dialog.show();
        // await closing of dialog
        await new Promise(resolve => {
            dialog.addEventListener('closed', function onClosed(evt) {
                evt.target?.removeEventListener('closed', onClosed);
                resolve();
            });
        });
    }
    /** Loads the file `event.target.files[0]` into [[`src`]] as a `blob:...`. */
    async onLoadFiles(event) {
        const files = Array.from(event.target?.files ?? []);
        const promises = files.map(file => {
            return {
                text: file
                    .text()
                    .then(text => new DOMParser().parseFromString(text, 'application/xml')),
                name: file.name,
            };
        });
        for await (const file of promises) {
            await this.prepareImport(await file.text, file.name);
        }
    }
    renderInput() {
        return html `<input multiple @change=${(event) => {
            this.onLoadFiles(event);
            event.target.value = '';
        }} id="importied-plugin-input" accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd" type="file"></input>`;
    }
    buildIedSelection(importDoc, fileName) {
        this.iedSelection.push(html `<mwc-dialog data-file="${fileName}">
      <filtered-list hasSlot multi>
        ${Array.from(importDoc?.querySelectorAll(':root > IED') ?? []).map(ied => html `<mwc-check-list-item value="${identity(ied)}"
              >${ied.getAttribute('name')}</mwc-check-list-item
            >`)}
        <mwc-icon-button slot="meta" icon="edit"></mwc-icon-button>
      </filtered-list>
      <mwc-button
        dialogAction="close"
        label="${get('close')}"
        slot="secondaryAction"
        style="--mdc-theme-primary: var(--mdc-theme-error)"
      ></mwc-button>
      <mwc-button
        label="IEDs"
        slot="primaryAction"
        icon="add"
        @click=${() => this.importIEDs(importDoc, fileName)}
      ></mwc-button>
    </mwc-dialog>`);
    }
    render() {
        return html `${this.iedSelection}${this.renderInput()}`;
    }
}
ImportingIedPlugin.styles = css `
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
__decorate([
    property({ attribute: false })
], ImportingIedPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], ImportingIedPlugin.prototype, "editCount", void 0);
__decorate([
    state()
], ImportingIedPlugin.prototype, "iedSelection", void 0);
__decorate([
    query('#importied-plugin-input')
], ImportingIedPlugin.prototype, "pluginFileUI", void 0);
__decorate([
    query('mwc-dialog')
], ImportingIedPlugin.prototype, "dialog", void 0);
//# sourceMappingURL=ImportIEDs.js.map