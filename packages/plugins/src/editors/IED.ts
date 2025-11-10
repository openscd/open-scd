import {
  css,
  html,
  query,
  property,
  state,
  LitElement,
  PropertyValues,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';
import { nothing } from 'lit-html';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-radio-list-item';
import '@material/mwc-button';
import '@openscd/open-scd/src/oscd-filter-button.js';

import './ied/ied-container.js';
import './ied/element-path.js';
import './ied/create-ied-dialog.js';

import {
  findLLN0LNodeType,
  createLLN0LNodeType,
  createIEDStructure,
} from './ied/foundation.js';
import {
  compareNames,
  getDescriptionAttribute,
  getNameAttribute,
} from '@openscd/open-scd/src/foundation.js';
import { SelectedItemsChangedEvent } from '@openscd/open-scd/src/oscd-filter-button.js';
import { Nsdoc } from '@openscd/open-scd/src/foundation/nsdoc.js';
import { getIcon } from '@openscd/open-scd/src/icons/icons.js';
import { OscdApi, newEditEventV2, InsertV2 } from '@openscd/core';
import { CreateIedDialog } from './ied/create-ied-dialog.js';

/** An editor [[`plugin`]] for editing the `IED` section. */
export default class IedPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  /** All the nsdoc files that are being uploaded via the settings. */
  @property()
  nsdoc!: Nsdoc;

  @property()
  oscdApi: OscdApi | null = null;

  @query('create-ied-dialog') createIedDialog!: CreateIedDialog;

  @state()
  selectedIEDs: string[] = [];

  @state()
  selectedLNClasses: string[] = [];

  @state()
  private get iedList(): Element[] {
    return this.doc
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a, b) =>
          compareNames(a, b)
        )
      : [];
  }

  @state()
  private get lnClassList(): string[][] {
    const currentIed = this.selectedIed;
    const uniqueLNClassList: string[] = [];
    if (currentIed) {
      return Array.from(currentIed.querySelectorAll('LN0, LN'))
        .filter(element => element.hasAttribute('lnClass'))
        .filter(element => {
          const lnClass = element.getAttribute('lnClass') ?? '';
          if (uniqueLNClassList.includes(lnClass)) {
            return false;
          }
          uniqueLNClassList.push(lnClass);
          return true;
        })
        .sort((a, b) => {
          const aLnClass = a.getAttribute('lnClass') ?? '';
          const bLnClass = b.getAttribute('lnClass') ?? '';

          return aLnClass.localeCompare(bLnClass);
        })
        .map(element => {
          const lnClass = element.getAttribute('lnClass');
          const label = this.nsdoc.getDataDescription(element).label;
          return [lnClass, label];
        }) as string[][];
    }
    return [];
  }

  @state()
  private get selectedIed(): Element | undefined {
    // When there is no IED selected, or the selected IED has no parent (IED has been removed)
    // select the first IED from the List.
    if (this.selectedIEDs.length >= 1) {
      const iedList = this.iedList;
      return iedList.find(element => {
        const iedName = getNameAttribute(element);
        return this.selectedIEDs[0] === iedName;
      });
    }
    return undefined;
  }

  lNClassListOpenedOnce = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadPluginState();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.storePluginState();
  }

  private createVirtualIED(iedName: string): void {
    const inserts: InsertV2[] = [];

    const existingLLN0 = findLLN0LNodeType(this.doc);
    const lnTypeId = existingLLN0?.getAttribute('id') || 'PlaceholderLLN0';

    const ied = createIEDStructure(this.doc, iedName, lnTypeId);

    const dataTypeTemplates = this.doc.querySelector('DataTypeTemplates');
    inserts.push({
      parent: this.doc.querySelector('SCL')!,
      node: ied,
      reference: dataTypeTemplates,
    });

    if (!existingLLN0) {
      const lnodeTypeInserts = createLLN0LNodeType(this.doc, lnTypeId);
      inserts.push(...lnodeTypeInserts);
    }

    this.dispatchEvent(newEditEventV2(inserts));

    this.selectedIEDs = [iedName];
    this.selectedLNClasses = [];
    this.requestUpdate('selectedIed');
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the document is updated, we reset the selected IED if it no longer exists
    const isDocumentUpdated =
      _changedProperties.has('doc') ||
      _changedProperties.has('editCount') ||
      _changedProperties.has('nsdoc');

    if (isDocumentUpdated) {
      // if the IED exists, retain selection
      const iedExists = this.doc?.querySelector(
        `IED[name="${this.selectedIEDs[0]}"]`
      );

      if (iedExists) return;

      this.selectedIEDs = [];
      this.selectedLNClasses = [];
      this.lNClassListOpenedOnce = false;

      const iedList = this.iedList;
      if (iedList.length > 0) {
        const iedName = getNameAttribute(iedList[0]);
        if (iedName) {
          this.selectedIEDs = [iedName];
        }
      }
    }
  }

  private loadPluginState(): void {
    const stateApi = this.oscdApi?.pluginState;
    const selectedIEDs: string[] | null =
      (stateApi?.getState()?.selectedIEDs as string[]) ?? null;

    if (selectedIEDs) {
      this.onSelectionChange(selectedIEDs);
    }
  }

  private storePluginState(): void {
    const stateApi = this.oscdApi?.pluginState;

    if (stateApi) {
      stateApi.setState({ selectedIEDs: this.selectedIEDs });
    }
  }

  private calcSelectedLNClasses(): string[] {
    const somethingSelected = this.selectedLNClasses.length > 0;
    const lnClasses = this.lnClassList.map(lnClassInfo => lnClassInfo[0]);

    let selectedLNClasses = lnClasses;

    if (somethingSelected) {
      selectedLNClasses = lnClasses.filter(lnClass =>
        this.selectedLNClasses.includes(lnClass)
      );
    }

    return selectedLNClasses;
  }

  private onSelectionChange(selectedIeds: string[]): void {
    const equalArrays = <T>(first: T[], second: T[]): boolean => {
      return (
        first.length === second.length &&
        first.every((val, index) => val === second[index])
      );
    };

    const selectionChanged = !equalArrays(this.selectedIEDs, selectedIeds);

    if (!selectionChanged) {
      return;
    }

    this.lNClassListOpenedOnce = false;
    this.selectedIEDs = selectedIeds;
    this.selectedLNClasses = [];
    this.requestUpdate('selectedIed');
  }

  private renderIEDList(): TemplateResult {
    const iedList = this.iedList;
    if (iedList.length === 0) {
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('iededitor.missing')}</span
        >
      </h1>`;
    }
    return html`<section>
      <div class="header">
        <h1>${translate('filters')}:</h1>
        <oscd-filter-button
          id="iedFilter"
          icon="developer_board"
          .header=${translate('iededitor.iedSelector')}
          @selected-items-changed="${(e: SelectedItemsChangedEvent) =>
            this.onSelectionChange(e.detail.selectedItems)}"
        >
          ${iedList.map(ied => {
            const name = getNameAttribute(ied);
            const descr = getDescriptionAttribute(ied);
            const type = ied.getAttribute('type');
            const manufacturer = ied.getAttribute('manufacturer');
            return html` <mwc-radio-list-item
              value="${name}"
              ?twoline="${type && manufacturer}"
              ?selected="${this.selectedIEDs.includes(name ?? '')}"
            >
              ${name} ${descr ? html` (${descr})` : html``}
              <span slot="secondary">
                ${type} ${type && manufacturer ? html`&mdash;` : nothing}
                ${manufacturer}
              </span>
            </mwc-radio-list-item>`;
          })}
        </oscd-filter-button>

        <oscd-filter-button
          id="lnClassesFilter"
          multi="true"
          .header="${translate('iededitor.lnFilter')}"
          @selected-items-changed="${(e: SelectedItemsChangedEvent) => {
            this.selectedLNClasses = e.detail.selectedItems;
            this.requestUpdate('selectedIed');
          }}"
        >
          <span slot="icon">${getIcon('lNIcon')}</span>
          ${this.lnClassList.map(lnClassInfo => {
            const value = lnClassInfo[0];
            const label = lnClassInfo[1];
            return html`<mwc-check-list-item
              value="${value}"
              ?selected="${this.selectedLNClasses.includes(value)}"
            >
              ${label}
            </mwc-check-list-item>`;
          })}
        </oscd-filter-button>

        <element-path class="elementPath"></element-path>
      </div>

      <ied-container
        .editCount=${this.editCount}
        .doc=${this.doc}
        .element=${this.selectedIed}
        .selectedLNClasses=${this.calcSelectedLNClasses()}
        .nsdoc=${this.nsdoc}
      ></ied-container>
    </section>`;
  }

  render(): TemplateResult {
    return html`<div>
      <mwc-button
        class="add-ied-button"
        icon="add"
        @click=${() => this.createIedDialog.show()}
      >
        ${translate('iededitor.createIed')}
      </mwc-button>
      ${this.renderIEDList()}
      <create-ied-dialog
        .doc=${this.doc}
        .onConfirm=${(iedName: string) => this.createVirtualIED(iedName)}
      ></create-ied-dialog>
    </div>`;
  }

  static styles = css`
    :host {
      width: 100vw;
      position: relative;
    }

    section {
      padding: 8px 12px 16px;
    }

    .header {
      display: flex;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }

    .elementPath {
      margin-left: auto;
      padding-right: 12px;
    }

    .add-ied-button {
      display: block;
      float: right;
      margin: 8px 12px 0 0;
    }
  `;
}
