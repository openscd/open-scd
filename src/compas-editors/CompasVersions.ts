import {css, html, LitElement, property, TemplateResult} from 'lit-element';
import {get, translate} from 'lit-translate';
import {newWizardEvent, Wizard} from "../foundation.js";

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
          <h1>${translate('compas.versions.title')}</h1>
          <mwc-list>
            ${this.scls.map( item => {
                let element = this.getElementbyName(item, SDS_NAMESPACE, "Name");
                if (element === null) {
                  element = this.getElementbyName(item, SDS_NAMESPACE, "Id");
                }
                const name = element!.textContent ?? '';
                const version = this.getElementbyName(item, SDS_NAMESPACE, "Version")!.textContent ?? '';
                return html`<mwc-list-item tabindex="0"
                                        @click=${() => {
                                          this.confirmRestoreCompas(version);
                                        }}>
                                ${name} (${version})
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

    // Close the Restore Dialog.
    getOpenScdElement().dispatchEvent(newWizardEvent());

    return [];
  }
}

function confirmRestoreCompasWizard(docName: string, docId: string, version: string): Wizard {
  return [
    {
      title: get('compas.versions.confirmTitle'),
      primary: {
        icon: '',
        label: get('compas.versions.confirmButton'),
        action: openScl(docName, docId, version),
      },
      content: [
        html`<span>${translate('compas.versions.confirm')}</span>`,
      ],
    },
  ];
}

