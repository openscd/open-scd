import {css, html, LitElement, property, TemplateResult} from 'lit-element';
import {get, translate} from 'lit-translate';
import {newLogEvent, newWizardEvent, Wizard} from "../foundation.js";

import {CompasSclDataService, SDS_NAMESPACE} from "../compas-services/CompasSclDataService.js";
import {getTypeFromDocName, updateDocumentInOpenSCD} from "../compas/foundation.js";
import {getOpenScdElement, styles} from './foundation.js';

/** An editor [[`plugin`]] for selecting the `Substation` section. */
export default class CompasVersionsPlugin extends LitElement {
  @property({type: String})
  docId!: string;
  @property({type: String})
  docName!: string;

  @property()
  scls!: Element[];

  firstUpdated() {
    if (!this.docId) {
      this.scls = [];
    } else {
      this.fetchData()
    }
  }

  fetchData() {
    const type = getTypeFromDocName(this.docName);
    CompasSclDataService().listVersions(type, this.docId)
      .then(xmlResponse => {
        this.scls = Array.from(xmlResponse.querySelectorAll('Item') ?? [])
      });
  }

  confirmRestoreCompas(version: string): void {
    this.dispatchEvent(newWizardEvent(confirmRestoreCompasWizard(this.docName, this.docId, version)))
  }

  confirmDeleteCompas(): void {
    this.dispatchEvent(newWizardEvent(confirmDeleteCompasWizard(this.docName, this.docId)))
  }

  confirmDeleteVersionCompas(version: string): void {
    this.dispatchEvent(newWizardEvent(confirmDeleteVersionCompasWizard(this.docName, this.docId, version)))
  }

  private getElementbyName(parent: Element, namespace: string, tagName: string): Element | null {
    const elements = parent.getElementsByTagNameNS(namespace, tagName);
    if (elements.length > 0) {
      return elements.item(0);
    }
    return null;
  }

  render(): TemplateResult {
    if (!this.scls) {
      return html `
        <h1>
          <span style="color: var(--base1)">${translate("compas.loading")}</span>
        </h1>`
    }

    if (this.scls?.length <= 0) {
      return html `
        <mwc-list>
          <mwc-list-item>
            <span style="color: var(--base1)">${translate('compas.versions.noScls')}</span>
          </mwc-list-item>
        </mwc-list>`
    }
    return html`
      <div id="containerCompasVersions">
        <section tabindex="0">
          <h1>
            ${translate('compas.versions.title')}
            <mwc-icon-button icon="delete_forever"
                             @click=${() => {
                               this.confirmDeleteCompas();
                             }}></mwc-icon-button>
          </h1>
          <mwc-list>
            ${this.scls.map( (item, index, items) => {
                let element = this.getElementbyName(item, SDS_NAMESPACE, "Name");
                if (element === null) {
                  element = this.getElementbyName(item, SDS_NAMESPACE, "Id");
                }
                const name = element!.textContent ?? '';
                const version = this.getElementbyName(item, SDS_NAMESPACE, "Version")!.textContent ?? '';
                if (items.length - 1 === index) {
                  return html`<mwc-list-item tabindex="0" graphic="control">
                                ${name} (${version})
                                <span slot="graphic" style="width: 90px">
                                  <mwc-icon @click=${() => {
                                              this.confirmRestoreCompas(version);
                                            }}>restore</mwc-icon>
                                </span>
                              </mwc-list-item>`
                }
                return html`<mwc-list-item tabindex="0"
                                           graphic="control">
                                ${name} (${version})
                                <span slot="graphic" style="width: 90px">
                                  <mwc-icon @click=${() => {
                                              this.confirmRestoreCompas(version);
                                            }}>restore</mwc-icon>
                                  <mwc-icon @click=${() => {
                                              this.confirmDeleteVersionCompas(version);
                                            }}>delete</mwc-icon>
                                </span>
                            </mwc-list-item>`
            })}
          </mwc-list>
        </section>
      </div>`
  }

  static styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    #containerCompasVersions {
      display: grid;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(400px, auto));
    }

    @media (max-width: 387px) {
      #containerCompasVersions {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}

function fetchScl(type: string, docId: string, version: string) {
  CompasSclDataService().getSclDocumentVersion(type, docId, version)
    .then(response => {
      // Copy the SCL Result from the Response and create a new Document from it.
      const sclElement = response.querySelectorAll("SCL").item(0);
      const sclDocument = document.implementation.createDocument("", "", null);
      sclDocument.getRootNode().appendChild(sclElement.cloneNode(true));

      updateDocumentInOpenSCD(sclDocument);
    });
}

function openScl(docName: string, docId: string, version: string) {
  return function () {
    const type = getTypeFromDocName(docName);
    fetchScl(type, docId, version);

    const openScd = getOpenScdElement();
    openScd.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('compas.versions.restoreVersionSuccess', {version : version})
      }));

    // Close the Restore Dialog.
    openScd.dispatchEvent(newWizardEvent());

    return [];
  }
}

function deleteScl(docName: string, docId: string) {
  return function () {
    const type = getTypeFromDocName(docName);
    CompasSclDataService().deleteSclDocument(type, docId);

    const openScd = getOpenScdElement();
    openScd.docId = '';
    openScd.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('compas.versions.deleteSuccess')
      }));

    // Close the Restore Dialog.
    openScd.dispatchEvent(newWizardEvent());

    return [];
  }
}

function deleteSclVersion(docName: string, docId: string, version: string) {
  return function () {
    const type = getTypeFromDocName(docName);
    CompasSclDataService().deleteSclDocumentVersion(type, docId, version);

    const openScd = getOpenScdElement();
    openScd.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('compas.versions.deleteVersionSuccess', {version : version})
      }));

    // Close the Restore Dialog.
    openScd.dispatchEvent(newWizardEvent());

    return [];
  }
}

function confirmRestoreCompasWizard(docName: string, docId: string, version: string): Wizard {
  return [
    {
      title: get('compas.versions.confirmRestoreTitle'),
      primary: {
        icon: '',
        label: get('compas.versions.confirmButton'),
        action: openScl(docName, docId, version),
      },
      content: [
        html`<span>${translate('compas.versions.confirmRestore', {version : version})}</span>`,
      ],
    },
  ];
}

function confirmDeleteCompasWizard(docName: string, docId: string): Wizard {
  return [
    {
      title: get('compas.versions.confirmDeleteTitle'),
      primary: {
        icon: '',
        label: get('compas.versions.confirmButton'),
        action: deleteScl(docName, docId),
      },
      content: [
        html`<span>${translate('compas.versions.confirmDelete')}</span>`,
      ],
    },
  ];
}

function confirmDeleteVersionCompasWizard(docName: string, docId: string, version: string): Wizard {
  return [
    {
      title: get('compas.versions.confirmDeleteVersionTitle'),
      primary: {
        icon: '',
        label: get('compas.versions.confirmButton'),
        action: deleteSclVersion(docName, docId, version),
      },
      content: [
        html`<span>${translate('compas.versions.confirmDeleteVersion', {version : version})}</span>`,
      ],
    },
  ];
}

