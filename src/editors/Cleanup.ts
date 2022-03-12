'use strict';

import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate } from 'lit-translate';
import { List, MWCListIndex } from '@material/mwc-list';

import { compareNames } from '../foundation.js';
import {
  Delete,
  identity,
  newActionEvent,
  newWizardEvent,
  newSubWizardEvent,
} from '../foundation.js';

import { editDataSetWizard } from '../wizards/dataset.js';
import { styles } from './templates/foundation.js';

interface datasetInfo {
  name: string;
  type: string;
  manufacturer: string;
  dataset: Element;
  lnClass: string;
  inst: string;
  prefix: string|null;
}

/** An editor [[`plugin`]] for cleaning SCL references and definitions. */
export default class Cleanup extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  @property()
  disableDatasetClean = false;
  @property()
  gridRowsUnusedDatasets: datasetInfo[] = [];
  @property()
  selectedItems: MWCListIndex | [] = [];

  /**
   * Get sorted IEDs associated with this SCL file.
   */
  private get ieds(): Element[] {
    return this.doc
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a, b) =>
          compareNames(a, b)
        )
      : [];
  }

  /**
   * Get all the control block of a particular type
   * @param ied - The IED to search through.
   * @param controlType - One of GSEControl, SampledValueControl or ReportControl.
   * @returns The SCL element for all the control blocks type in an array.
   */
  private getControlType(ied: Element, controlType = 'GSEControl'): Element[] {
    // GSEControl and SampledValueControl must be in LN0 but ReportControl may be within any LN
    return Array.from(
      ied.querySelectorAll(
        `:scope > Access,Point > Server > LDevice > LN0 > ${controlType},
        :scope > Access,Point > Server > LDevice > LN > ${controlType}`
      )
    );
  }

  /**
   * Get all the DataSets for a specific IED
   * @param ied - The SCL IED element to search through.
   * @returns An Array containing the name of all DataSets.
   */
  private getDatasetNames(ied: Element): Element[] {
    return Array.from(
      ied.querySelectorAll(
        ':scope > AccessPoint > Server > LDevice > LN0 > DataSet, :scope > AccessPoint > Server > LDevice > LN > DataSet'
      )
    );
  }

  /**
   * Gets DataSets for a particular control block type.
   * @param ied - The SCL IED element to search through.
   * @param controlType - One of GSEControl, SampledValueControl or ReportControl.
   * @returns An array containing the DataSets used by a control type.
   */
  private getControlDatasets(ied: Element, controlType: string) {
    const controlInfo: string[] = [];
    this.getControlType(ied, controlType).forEach(control => {
      if (control?.getAttribute('name')) {
        controlInfo.push(control.getAttribute('datSet') ?? 'Unknown Dataset');
      }
    });
    return controlInfo;
  }

  /**
   * For an SCL IED element, return the used DataSet names.
   * @param ied - An SCL IED element.
   * @returns All used DataSet in an array by name.
   */
  private getUsedDatasets(ied: Element) {
    const controlReport = this.getControlDatasets(ied, 'ReportControl');
    const controlGSE = this.getControlDatasets(ied, 'GSEControl');
    const controlSV = this.getControlDatasets(ied, 'SampledValueControl');
    const controlLog = this.getControlDatasets(ied, 'LogControl');
    return controlReport.concat(controlGSE, controlSV, controlLog);
  }

  /**
   * Get a named dataset from a specific IED name in the SCL file.
   * @param ied - An SCL IED element by name.
   * @param dataset - The name of a DataSet.
   * @returns - An SCL DataSet Element
   */
  private getDatasetFromIED(ied: string, dataset: string, lnClass: string, inst: string, prefix:string|null): Element | null {
    const prefixValue = prefix ? '[prefix=${prefix}]' : ''
    return this.doc.querySelector(
      `:root > IED[name="${ied}"] > AccessPoint > Server > LDevice > LN0[lnClass="${lnClass}"] > DataSet[name="${dataset}"], :root > IED[name="${ied}"] > AccessPoint > Server > LDevice > LN[lnClass="${lnClass}"][inst="${inst}"]${prefixValue} > DataSet[name="${dataset}"]`
    );
  }

  /**
   * Set a class variable for selected items to allow processing and UI interaction
   */
  private getSelectedUnusedDatasetItems() {
    this.selectedItems = (<List>(
      this.shadowRoot!.querySelector('.cleanupUnusedDatasetsList')
    )).index;
  }

  /**
   * Render a user selectable table of unused datasets if any exist, otherwise indicate this is not an issue.
   * @returns html for table and action button.
   */
  private getUnusedDatasets() {
    // Unused Datasets
    const gridRowsUnusedDatasets: datasetInfo[] = [];
    this.ieds.forEach(ied => {
      const usedDatasets = this.getUsedDatasets(ied);
      this.getDatasetNames(ied)
        .filter(ds => !usedDatasets.includes(ds.getAttribute('name')!))
        .forEach(unusedDS => {
          const rowItem: datasetInfo = {
            name: ied.getAttribute('name')!,
            type: ied.getAttribute('type')!,
            manufacturer: ied.getAttribute('manufacturer')!,
            dataset: unusedDS,
            lnClass: unusedDS.parentElement!.getAttribute('lnClass')!,
            inst: unusedDS.parentElement!.getAttribute('inst')!,
            prefix: unusedDS.parentElement!.getAttribute('prefix'),
          };
          gridRowsUnusedDatasets.push(rowItem);
        });
    });
    this.gridRowsUnusedDatasets = gridRowsUnusedDatasets.sort((a, b) =>
      a.dataset
        .getAttribute('name')!
        .localeCompare(b.dataset.getAttribute('name')!)
    );
    return html`
      <h1>
        ${translate('cleanup.unusedDatasets.title')}
        (${this.gridRowsUnusedDatasets.length})
        <abbr slot="action">
          <mwc-icon-button
            icon="info"
            title="${translate('cleanup.unusedDatasets.tooltip')}"
          >
          </mwc-icon-button>
        </abbr>
      </h1>
      <filtered-list multi class="cleanupUnusedDatasetsList"
        >${Array.from(
          this.gridRowsUnusedDatasets.map(
            item =>
              html`<mwc-check-list-item
                twoline
                value="${identity(item.dataset)}"
                ><span class="unusedDataset"
                  >${item.dataset.getAttribute('name')}
                </span>
                <span>
                  <mwc-icon-button
                    label="Edit"
                    icon="edit"
                    class="editUnusedDataset"
                    @click=${(e: MouseEvent) => {
                      e.target?.dispatchEvent(
                        newSubWizardEvent(() => editDataSetWizard(item.dataset))
                      );
                    }}
                  ></mwc-icon-button>
                </span>
                <span slot="secondary"
                  >${item.name} (${item.manufacturer}) - ${item.type}</span
                >
              </mwc-check-list-item>`
          )
        )}
      </filtered-list>
      <mwc-button
        icon="delete"
        class="cleanupUnusedDatasetsDeleteButton"
        label="${translate('cleanup.unusedDatasets.deleteButton')} (${(<
          Set<number>
        >this.selectedItems).size || '0'})"
        ?disabled=${(<Set<number>>this.selectedItems).size === 0 ||
        (Array.isArray(this.selectedItems) && !this.selectedItems.length)}
        slot="secondaryAction"
        @click=${(e: MouseEvent) => {
          const cleanItems = Array.from(
            (<Set<number>>this.selectedItems).values()
          ).map(index => this.gridRowsUnusedDatasets[index]);
          const deleteActions = this.cleanDatasets(cleanItems);
          deleteActions.forEach(deleteAction =>
            e.target?.dispatchEvent(newActionEvent(deleteAction))
          );
          e.target?.dispatchEvent(newWizardEvent());
        }}
      ></mwc-button>
    `;
  }

  /**
   * Clean datasets as requested by removing DataSet elements specified by the user from the SCL file
   * @returns an actions array to support undo/redo
   */
  public cleanDatasets(cleanItems: datasetInfo[]): Delete[] {
    const actions: Delete[] = [];
    if (cleanItems) {
      cleanItems.forEach(item => {
        const itemToDelete: Element = this.getDatasetFromIED(
          item.name,
          item.dataset.getAttribute('name')!,
          item.lnClass,
          item.inst,
          item.prefix
        )!;
        actions.push({
          old: {
            parent: <Element>itemToDelete.parentElement!,
            element: itemToDelete,
            reference: <Node | null>itemToDelete!.nextSibling,
          },
        });
      });
    }
    return actions;
  }

  async firstUpdated(): Promise<void> {
    const checklist: List = this.shadowRoot!.querySelector(
      '.cleanupUnusedDatasetsList'
    )!;
    checklist!.addEventListener('selected', () => {
      this.getSelectedUnusedDatasetItems();
    });
  }

  render(): TemplateResult {
    return html`
      <div class="cleanupUnusedDatasets">
        <section tabindex="0">${this.getUnusedDatasets()}</section>
      </div>
    `;
  }

  static styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    .cleanupUnusedDatasets {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      .cleanupUnusedDatasets {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }

    .editUnusedDataset {
      --mdc-icon-size: 16px;
    }
  `;
}
