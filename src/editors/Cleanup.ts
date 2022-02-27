'use strict';

import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { render } from 'lit-html';

import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column-group.js';
import '@vaadin/grid/theme/material/vaadin-grid.js';
import '@vaadin/grid/theme/material/vaadin-grid-filter-column.js';
import '@vaadin/grid/theme/material/vaadin-grid-selection-column.js';

// import './subscription/subscriber-ied-list.js';
import './cleanup/publisher-goose-list.js';

import { compareNames } from '../foundation.js';
import {
  Delete,
  newActionEvent,
  newWizardEvent,
  newSubWizardEvent,
} from '../foundation.js';
import { editDataSetWizard } from '../wizards/dataset.js';

/** An editor [[`plugin`]] for cleaning SCL references and definitions. */
export default class Cleanup extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  @property()

  areDatasetsCleanable = false;

  gridRowsUnusedDatasets = [];

  /**
   * Get sorted IEDs associated with this SCL file
   */
  private get ieds(): Element[] {
    return this.doc
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a, b) =>
          compareNames(a, b)
        )
      : [];
  }

  /**
   * Get all the published GOOSE messages.
   * @param ied - The IED to search through.
   * @returns All the published GOOSE messages of this specific IED.
   */
  private getControlType(ied: Element, controlType = 'GSEControl'): Element[] {
    return Array.from(
      ied.querySelectorAll(
        `:scope > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > ${controlType}`
      )
    );
  }

  /**
   * Get all the published GOOSE messages.
   * @param ied - The IED to search through.
   * @returns All the published GOOSE messages of this specific IED.
   */
  private getDatasets(ied: Element): string[] {
    return Array.from(
      ied.querySelectorAll(
        `:scope > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > DataSet`
      ),
      elem => elem.getAttribute('name') ?? 'unknown'
    );
  }
  // gseControl
  private getControlInfo(ied: Element, controlType: string) {
    const controlInfo: string[] = [];
    this.getControlType(ied, controlType).forEach(control => {
      if (control && !!control.getAttribute('name')) {
        controlInfo.push(control.getAttribute('datSet') ?? 'unknown dataset');
      }
    });
    return controlInfo;
  }

  private getUsedDatasets(ied: Element) {
    const controlReport = this.getControlInfo(ied, 'ReportControl');
    const controlGSE = this.getControlInfo(ied, 'GSEControl');
    const controlSV = this.getControlInfo(ied, 'SampledValueControl');
    return controlReport.concat(controlGSE, controlSV);
  }

  private getDatasetFromIED(ied: string, dataset: string): Element|null {
    return this.doc.querySelector(`:root > IED[name="${ied}"] > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > DataSet[name="${dataset}"]`)
  }

  private cleanDatasets(): Delete[] {
    const gridDataset = this.shadowRoot?.querySelector('#grid-datasets');

    const actions: Delete[] = [];

    if (gridDataset) {
      gridDataset.selectedItems.forEach((item) => {
        const itemToDelete = this.getDatasetFromIED(item.name, item.dataset)
        console.log(itemToDelete)
        actions.push({
          old: {
            parent: itemToDelete.parentElement!,
            itemToDelete,
            reference: itemToDelete.nextSibling,
          },
        });
      })
    } 
    return actions;
  }

  private doDataSetRendering(root, column, rowData) {
    // const datasetElement = this.getDatasetFromIED(rowData.item.name, rowData.item.dataset)
    return render( html`
    <span>${rowData.item.dataset}</span>
    <span><mwc-button
    id="editdataset"
    label="Edit",
    })}
    icon="edit"
    }"
  ></mwc-button></span>
    `, root
    );

    // @click="${() => {
    //   this.dispatchEvent(
    //     newWizardEvent(editDataSetWizard(datasetElement))
    //   )
    // }

    // @click="${(e: MouseEvent) => {
    //   console.log(this)
    //   // e.target?.dispatchEvent(
    //   //   newWizardEvent(() => editDataSetWizard(datasetElement))
    //   // );
    //   this.dispatchEvent(
    //     newWizardEvent(() => editDataSetWizard(datasetElement))
    //   )
    // }}"

    // console.log(rowData)
    //   render(
    //     html`
    //       <button>Test</button>
    //     `, 
    //     root
    //   );
    }

  //   return `html
  //   <span>row.item.dataset</span>
  //   <span><mwc-button
  //   id="editdataset"
  //   label="do something with a dataset",
  //   })}
  //   icon="edit"
  //   @click="${(e: MouseEvent) => {
  //     e.target?.dispatchEvent(
  //       newSubWizardEvent(() => editDataSetWizard(getDatasetFromIED(row.item.name, row.item.dataset)))
  //     );
  //   }}}"
  // ></mwc-button></span>
  //   `
  // }

  private getUnusedDatasets() {
    // Unused Datasets
    let gridRowsUnusedDatasets = [];
    this.ieds.forEach(ied => {
      const usedDatasets = this.getUsedDatasets(ied);
      this.getDatasets(ied)
        .filter(ds => !usedDatasets.includes(ds))
        .forEach(unusedDS => {
          const rowItem = {
            name: ied.getAttribute('name') ?? 'unknown',
            type: ied.getAttribute('type') ?? 'unknown',
            manufacturer: ied.getAttribute('manufacturer') ?? 'unknown',
            dataset: unusedDS // unusedDS,
            // 
            // 
            // @click="${(e: MouseEvent) => {
            //   e.target?.dispatchEvent(
            //     newSubWizardEvent(() => editDataSetWizard(dataSet))
            //   );
            // }
            // 
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
            .renderer="${this.doDataSetRendering}"
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

  async firstUpdated(): Promise<void> {
    // nothing in particular
    let gridDataset = this.shadowRoot?.querySelector('#grid-datasets');

    if (gridDataset) {
      gridDataset.items = this.gridRowsUnusedDatasets;
      gridDataset.addEventListener('selected-items-changed', grid => {
        this.areDatasetsCleanable = grid.target?.selectedItems.length !== 0;
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
