'use strict';

import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { compareNames } from '../foundation.js';
import {
  Delete,
  newActionEvent,
  newWizardEvent,
} from '../foundation.js';

import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column-group.js';
import '@vaadin/grid/theme/material/vaadin-grid.js';
import '@vaadin/grid/theme/material/vaadin-grid-filter-column.js';
import '@vaadin/grid/theme/material/vaadin-grid-selection-column.js';

import type { Grid } from '@vaadin/grid';

interface iedData {
  name: string,
  type: string,
  manufacturer: string,
  dataset: string
}


/** An editor [[`plugin`]] for cleaning SCL references and definitions. */
export default class Cleanup extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  @property()
  areDatasetsCleanable = false;

  gridRowsUnusedDatasets: iedData[] = [];

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
    return Array.from(
      ied.querySelectorAll(
        `:scope > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > ${controlType}`
      )
    );
  }

  /**
   * Get all the DataSets for a specific IED
   * @param ied - The SCL IED element to search through.
   * @returns An Array containing the name of all DataSets.
   */
  private getDatasetNames(ied: Element): string[] {
    return Array.from(
      ied.querySelectorAll(
        `:scope > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > DataSet`
      ),
      elem => elem.getAttribute('name') ?? 'unknown'
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
        controlInfo.push(control.getAttribute('datSet') ?? 'unknown dataset');
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
    return controlReport.concat(controlGSE, controlSV);
  }

  /**
   * Get a named dataset from a specific IED name in the SCL file.
   * @param ied - An SCL IED element.
   * @param dataset - The name of a DataSet.
   * @returns - An SCL DataSet Element
   */
  private getDatasetFromIED(ied: string, dataset: string): Element | null {
    return this.doc.querySelector(
      `:root > IED[name="${ied}"] > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > DataSet[name="${dataset}"]`
    );
  }

  /**
   * Render a user selectable table of unused datasets if any exist, otherwise indicate this is not an issue
   * @returns 
   */
  private getUnusedDatasets() {
    // Unused Datasets
    const gridRowsUnusedDatasets: iedData[] = [];
    this.ieds.forEach(ied => {
      const usedDatasets = this.getUsedDatasets(ied);
      this.getDatasetNames(ied)
        .filter(ds => !usedDatasets.includes(ds))
        .forEach(unusedDS => {
          const rowItem:iedData = {
            name: ied.getAttribute('name') ?? 'unknown',
            type: ied.getAttribute('type') ?? 'unknown',
            manufacturer: ied.getAttribute('manufacturer') ?? 'unknown',
            dataset: unusedDS,
          };
          gridRowsUnusedDatasets.push(rowItem);
        });
    });
    this.gridRowsUnusedDatasets = gridRowsUnusedDatasets;
    if (this.gridRowsUnusedDatasets.length !== 0) {
      return html`<h2>Unused Datasets</h2>
        <section>
        <vaadin-grid id="grid-datasets" theme="row-stripes">
          <vaadin-grid-selection-column
            auto-select
            frozen
          ></vaadin-grid-selection-column>
            <vaadin-grid-filter-column
            path="name"
            header="IED Name"
            ></vaadin-grid-filter-column>
            <vaadin-grid-filter-column
            path="type"
            header="IED Type"
            ></vaadin-grid-filter-column>
            <vaadin-grid-filter-column
            id="manufacturer"
            path="manufacturer"
            header="IED Manufacturer"
            ></vaadin-grid-filter-column>
          <vaadin-grid-filter-column
            id="dataset"
            path="dataset"
            header="Unused Dataset Name"
          ></vaadin-grid-filter-column>
          </vaadin-grid-column-group>
        </vaadin-grid>
        <mwc-button
              icon="delete" id="grid-datasets-delete"
              label="Remove Selected Datasets"
              ?disabled=${!this.areDatasetsCleanable}
              @click=${(e: MouseEvent) => {
                const deleteActions = this.cleanDatasets();
                deleteActions.forEach(deleteAction =>
                  e.target?.dispatchEvent(newActionEvent(deleteAction))
                );
                e.target?.dispatchEvent(newWizardEvent());
                this.render();
              }}
              slot="secondaryAction"
            ></mwc-button>
        </section>`;
    } else {
      return html`<h2>Datasets</h2>
        <p>✓ All existing datasets are assigned</p> `;
    }
  }

  /**
   * Clean datasets as requested by removing DataSet elements specified by the user from the SCL file
   * @returns an actions array to support undo/redo
   */
   private cleanDatasets(): Delete[] {
    const gridDataset: Grid|null|undefined = this.shadowRoot?.querySelector('#grid-datasets');
    const actions: Delete[] = [];
    if (gridDataset) {
      gridDataset.selectedItems.forEach(item => {
        const itemToDelete: Element|null|undefined = this.getDatasetFromIED(item.name, item.dataset);
        console.log(itemToDelete);
        actions.push({
          old: {
            parent: itemToDelete?.parentElement,
            itemToDelete,
            reference: itemToDelete?.nextSibling,
          },
        });
      });
    }
    return actions;
  }

  async firstUpdated(): Promise<void> {
    const gridDataset: Grid|null|undefined = this.shadowRoot?.querySelector('#grid-datasets');
    // add event listener to allow button to be disabled
    if (gridDataset) {
      gridDataset.items = this.gridRowsUnusedDatasets;
      gridDataset.addEventListener('selected-items-changed', event => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedItems:any|null = event.target
        this.areDatasetsCleanable = selectedItems?.length !== 0
      });
    }
  }

  render(): TemplateResult {
    return html` <div id="containerTemplates">
      <section>${this.getUnusedDatasets()}</section>
    </div>`;
  }

  static styles = css`
    h2 {
      color: var(--base00);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }

    p {
      color: var(--base00);
      font-family: Roboto, sans-serif;
      font-weight: 300;
      overflow: clip visible;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 52px;
      padding-left: 1rem;
    }

    vaadin-grid {
      margin-top: 0em;
    }

    vaadin-grid-filter-column {
      width: 3em;
    }

    mwc-button {
      margin: 0.25rem;
      margin-left: 1rem;
    }

    #grid-datasets {
      width: auto;
      margin-left: 1rem;
      margin-right: 2rem;
      height: 400px;
    }

    /* matching vaadin-grid material themes with open-scd themes */
    * {
      --material-body-text-color: var(--base00);
      --material-secondary-text-color: var(--base00);
      --material-primary-text-color: var(--base01);
      --material-error-text-color: var(--red);
      --material-primary-color: var(--primary);
      --material-error-color: var(--red);
      --material-background-color: var(--base3);
    }
  `;
}
