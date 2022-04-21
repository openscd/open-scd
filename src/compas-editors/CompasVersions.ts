import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';

import { newLogEvent, newWizardEvent, Wizard } from "../foundation.js";
import { MultiSelectedEvent } from "@material/mwc-list/mwc-list-foundation";

import { CompasSclDataService, SDS_NAMESPACE } from "../compas-services/CompasSclDataService.js";
import { createLogEvent } from "../compas-services/foundation.js";
import {
  dispatchEventOnOpenScd,
  getOpenScdElement,
  getTypeFromDocName,
  updateDocumentInOpenSCD
} from "../compas/foundation.js";
import { addVersionToCompasWizard } from "../compas/CompasUploadVersion.js";
import { compareWizard } from "../compas/CompasCompareDialog.js";
import { getElementByName, styles } from './foundation.js';
import { wizards } from "../wizards/wizard-library.js";

// Save the selection for the current document.
let selectedVersionsOnCompasVersionsEditor: Set<number> = new Set();
// We will also add an Event Listener when a new document is opened. We then want to reset the selection.
function resetSelection(): void {
  // When a new document is loaded the selection will be reset.
  selectedVersionsOnCompasVersionsEditor = new Set();
}
addEventListener('open-doc', resetSelection);

/** An editor [[`plugin`]] for selecting the `Substation` section. */
export default class CompasVersionsPlugin extends LitElement {
  @property()
  doc!: XMLDocument;
  @property({type: String})
  docId!: string;
  @property({type: String})
  docName!: string;

  @property()
  scls!: Element[];

  firstUpdated(): void {
    if (!this.docId) {
      this.scls = [];
    } else {
      this.fetchData()
    }
  }

  fetchData(): void {
    const type = getTypeFromDocName(this.docName);
    CompasSclDataService().listVersions(type, this.docId)
      .then(xmlResponse => {
        this.scls = Array.from(xmlResponse.querySelectorAll('Item') ?? []);
      })
      .catch(() => {
        this.scls = [];
      });
  }

  confirmDeleteCompas(): void {
    this.dispatchEvent(newWizardEvent(confirmDeleteCompasWizard(this.docName, this.docId)));
  }

  addVersionCompasToCompas(): void {
    this.dispatchEvent(newWizardEvent(addVersionToCompasWizard({docId: this.docId, docName: this.docName})));
  }

  confirmRestoreVersionCompas(version: string): void {
    this.dispatchEvent(newWizardEvent(confirmRestoreVersionCompasWizard(this.docName, this.docId, version)));
  }

  confirmDeleteVersionCompas(version: string): void {
    this.dispatchEvent(newWizardEvent(confirmDeleteVersionCompasWizard(this.docName, this.docId, version)));
  }

  private getSelectedVersions(): Array<string> {
    const selectedVersions: Array<string> = [];
    const listItems = this.shadowRoot!.querySelectorAll('mwc-check-list-item');
    selectedVersionsOnCompasVersionsEditor.forEach(index => {
        selectedVersions.push(listItems.item(index).value);
      });
    return selectedVersions;
  }

  async compareCurrentVersion(): Promise<void> {
    const selectedVersions = this.getSelectedVersions();
    if (selectedVersions.length === 1) {
      const oldVersion = selectedVersions[0];
      const oldScl = await this.getVersion(oldVersion);
      const newScl = this.doc.documentElement;

      this.dispatchEvent(newWizardEvent(
        compareWizard(oldScl, newScl,
          {title: get('compas.compare.title', {oldVersion: oldVersion, newVersion: 'current'})})));
    } else {
      this.dispatchEvent(newWizardEvent(
        showMessageWizard(get("compas.versions.selectOneVersionsTitle"),
          get("compas.versions.selectOneVersionsMessage", {size: selectedVersions.length}))));
    }
  }

  async compareVersions(): Promise<void> {
    const selectedVersions = this.getSelectedVersions();
    if (selectedVersions.length === 2) {
      const oldVersion = selectedVersions[0];
      const newVersion = selectedVersions[1];

      const oldScl = await this.getVersion(oldVersion);
      const newScl = await this.getVersion(newVersion);

      this.dispatchEvent(newWizardEvent(
        compareWizard(oldScl, newScl,
          {title: get('compas.compare.title', {oldVersion: oldVersion, newVersion: newVersion})})));
    } else {
      this.dispatchEvent(newWizardEvent(
        showMessageWizard(get("compas.versions.selectTwoVersionsTitle"),
          get("compas.versions.selectTwoVersionsMessage", {size: selectedVersions.length}))));
    }
  }

  private async getVersion(version: string) {
    const type = getTypeFromDocName(this.docName);
    return CompasSclDataService().getSclDocumentVersion(type, this.docId, version)
      .then(sclDocument => {
        return Promise.resolve(sclDocument.documentElement);
      });
  }

  private openEditWizard(): void {
    const wizard = wizards['SCL'].edit(this.doc.documentElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private getCurrentVersion(): string {
    const header = this.doc.querySelector('Header');
    return (header && header.hasAttribute('version')
      ? header.getAttribute('version')!
      : 'unknown');
  }

  private getCurrentName(): string {
    const sclName = this.doc.querySelector('SCL > Private[type="compas_scl"] > SclName');
    return (sclName && sclName.textContent
      ? sclName.textContent
      : 'unknown');
  }

  render(): TemplateResult {
    if (!this.scls) {
      return html `
        <compas-loading></compas-loading>
      `
    }

    if (this.scls.length <= 0) {
      return html `
        <mwc-list>
          <mwc-list-item>
            <span style="color: var(--base1)">${translate('compas.noSclVersions')}</span>
          </mwc-list-item>
        </mwc-list>`
    }
    return html`
      <h1>
        ${translate('compas.versions.sclInfo',
          { name: this.getCurrentName(),
            version: this.getCurrentVersion()
          })}
        <nav>
          <abbr title="${translate('compas.versions.addVersionButton')}">
            <mwc-icon-button icon="playlist_add"
                             @click=${() => {
                               this.addVersionCompasToCompas();
                             }}></mwc-icon-button>
          </abbr>
        </nav>
        <nav>
          <abbr title="${translate('compas.versions.deleteProjectButton')}">
            <mwc-icon-button icon="delete_forever"
                             @click=${() => {
                               this.confirmDeleteCompas();
                             }}></mwc-icon-button>
          </abbr>
        </nav>
        <nav>
          <abbr title="${translate('edit')}">
            <mwc-icon-button icon="edit"
                             @click=${() => this.openEditWizard()}></mwc-icon-button>
          </abbr>
        </nav>
      </h1>
      <div id="containerCompasVersions">
        <section tabindex="0">
          <h1>
            ${translate('compas.versions.title')}
          </h1>
          <mwc-list multi
                    @selected=${(evt: MultiSelectedEvent) => {
                      selectedVersionsOnCompasVersionsEditor = evt.detail.index;
                    }}>
            ${this.scls.map( (item, index, items) => {
                let element = getElementByName(item, SDS_NAMESPACE, "Name");
                if (element === null) {
                  element = getElementByName(item, SDS_NAMESPACE, "Id");
                }
                const name = element!.textContent ?? '';
                const version = getElementByName(item, SDS_NAMESPACE, "Version")!.textContent ?? '';
                if (items.length - 1 === index) {
                  return html`<mwc-check-list-item value="${version}"
                                                   tabindex="0"
                                                   graphic="icon"
                                                   .selected=${selectedVersionsOnCompasVersionsEditor.has(index)}>
                                ${name} (${version})
                                <span slot="graphic">
                                  <mwc-icon @click=${() => {
                                              this.confirmRestoreVersionCompas(version);
                                            }}>restore</mwc-icon>
                                </span>
                              </mwc-check-list-item>`
                }
                return html`<mwc-check-list-item value="${version}"
                                                 tabindex="0"
                                                 graphic="icon"
                                                 .selected=${selectedVersionsOnCompasVersionsEditor.has(index)}>
                                ${name} (${version})
                                <span slot="graphic">
                                  <mwc-icon @click=${() => {
                                              this.confirmRestoreVersionCompas(version);
                                            }}>restore</mwc-icon>
                                  <mwc-icon @click=${() => {
                                              this.confirmDeleteVersionCompas(version);
                                            }}>delete</mwc-icon>
                                </span>
                            </mwc-check-list-item>`
            })}
          </mwc-list>
        </section>
        <mwc-fab extended
                 icon="compare"
                 label="${translate('compas.versions.compareCurrentButton')}"
                 @click=${this.compareCurrentVersion}></mwc-fab>
        <mwc-fab extended
                 icon="compare"
                 label="${translate('compas.versions.compareButton')}"
                 @click=${this.compareVersions}></mwc-fab>
      </div>`
  }

  static styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    h1 > nav,
    h1 > abbr > mwc-icon-button {
      float: right;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    #containerCompasVersions {
      padding: 16px 12px 16px 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #containerCompasVersions {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }

    mwc-check-list-item {
      padding-left: 60px;
    }

    mwc-check-list-item > span {
      width: 90px;
      text-align: left;
    }

    mwc-fab {
      float: right;
      margin: 5px 5px 5px 5px
    }
  `;
}

function confirmDeleteCompasWizard(docName: string, docId: string): Wizard {
  function deleteScl(docName: string, docId: string) {
    return function () {
      const type = getTypeFromDocName(docName);

      CompasSclDataService()
        .deleteSclDocument(type, docId)
        .then (() => {
          const openScd = getOpenScdElement();
          if (openScd !== null) {
            openScd.docId = '';
            openScd.dispatchEvent(
              newLogEvent({
                kind: 'info',
                title: get('compas.versions.deleteSuccess')
              }));
          }
        })
        .catch(createLogEvent);

      // Close the Restore Dialog.
      dispatchEventOnOpenScd(newWizardEvent());

      return [];
    }
  }

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

function confirmRestoreVersionCompasWizard(docName: string, docId: string, version: string): Wizard {
  function openScl(docName: string, docId: string, version: string) {
    return function () {
      const type = getTypeFromDocName(docName);

      CompasSclDataService().getSclDocumentVersion(type, docId, version)
        .then(sclDocument => {
          updateDocumentInOpenSCD(sclDocument);

          dispatchEventOnOpenScd(
            newLogEvent({
              kind: 'info',
              title: get('compas.versions.restoreVersionSuccess', {version : version})
            }));
        })
        .catch(createLogEvent);

      // Close the Restore Dialog.
      dispatchEventOnOpenScd(newWizardEvent());

      return [];
    }
  }

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

function confirmDeleteVersionCompasWizard(docName: string, docId: string, version: string): Wizard {
  function deleteSclVersion(docName: string, docId: string, version: string) {
    return function () {
      const type = getTypeFromDocName(docName);

      CompasSclDataService()
        .deleteSclDocumentVersion(type, docId, version)
        .then(() => {
          dispatchEventOnOpenScd(
            newLogEvent({
              kind: 'info',
              title: get('compas.versions.deleteVersionSuccess', {version : version})
            }));
        })
        .catch(createLogEvent);

      // Close the Restore Dialog.
      dispatchEventOnOpenScd(newWizardEvent());

      return [];
    }
  }

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

function showMessageWizard(title: string, message: string): Wizard {
  return [
    {
      title: title,
      content: [
        html`<span>${message}</span>`,
      ],
    },
  ];
}
