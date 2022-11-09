'use strict';

import {
  customElement,
  css,
  html,
  LitElement,
  property,
  TemplateResult,
  query,
  queryAll,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-icon';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-checkbox';

import { Button } from '@material/mwc-button';
import { List, MWCListIndex } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

import '../../filtered-list.js';

import { editDataSetWizard } from '../../wizards/dataset.js';
import { styles } from '../templates/foundation.js';
import {
  identity,
  isPublic,
  newSubWizardEvent,
  newActionEvent,
} from '../../foundation.js';
import { cleanSCLItems, identitySort } from './foundation.js';

/** An editor component for cleaning SCL datasets. */
@customElement('cleanup-datasets')
export class CleanupDatasets extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Boolean })
  disableDataSetClean = false;

  @property({ type: Array })
  unreferencedDataSets: Element[] = [];

  @property({ attribute: false })
  selectedDatasetItems: MWCListIndex | [] = [];

  @query('.deleteButton')
  cleanupButton!: Button;

  @query('.dataSetList')
  dataSetList: List | undefined;

  @queryAll('mwc-check-list-item.checkListItem')
  dataSetItems: ListItem[] | undefined;

  async firstUpdated(): Promise<void> {
    this.dataSetList?.addEventListener('selected', () => {
      this.selectedDatasetItems = this.dataSetList!.index;
    });
  }

  /**
   * Provide list item in the DataSet cleanup container.
   * @param dataSet - an unused SCL DataSet element.
   * @returns html for checklist item.
   */
  private renderListItem(dataSet: Element): TemplateResult {
    return html` <mwc-check-list-item
      twoline
      class="checkListItem"
      value="${identity(dataSet)}"
      ><span class="unreferencedDataSet"
        >${dataSet.getAttribute('name')!}
      </span>
      <span>
        <mwc-icon-button
          label="Edit"
          icon="edit"
          class="editUnreferencedDataSet editItem"
          @click=${(e: MouseEvent) => {
            e.stopPropagation();
            e.target?.dispatchEvent(
              newSubWizardEvent(() => editDataSetWizard(dataSet))
            );
          }}
        ></mwc-icon-button>
      </span>
      <span slot="secondary"
        >${dataSet.closest('IED')?.getAttribute('name')}
        (${dataSet.closest('IED')?.getAttribute('manufacturer') ??
        'No manufacturer defined'})
        -
        ${dataSet.closest('IED')?.getAttribute('type') ??
        'No Type Defined'}</span
      >
    </mwc-check-list-item>`;
  }

  /**
   * Provide delete button the dataset cleanup container.
   * @returns html for the Delete Button of this container.
   */
  private renderDeleteButton(): TemplateResult {
    const sizeSelectedItems = (<Set<number>>this.selectedDatasetItems).size;

    return html` <mwc-button
      outlined
      icon="delete"
      class="deleteButton cleanupDeleteButton"
      label="${translate(
        'cleanup.unreferencedDataSets.deleteButton'
      )} (${sizeSelectedItems || '0'})"
      ?disabled=${(<Set<number>>this.selectedDatasetItems).size === 0 ||
      (Array.isArray(this.selectedDatasetItems) &&
        !this.selectedDatasetItems.length)}
      @click=${(e: MouseEvent) => {
        const cleanItems = Array.from(
          (<Set<number>>this.selectedDatasetItems).values()
        ).map(index => this.unreferencedDataSets[index]);
        const deleteActions = cleanSCLItems(cleanItems);
        deleteActions.forEach(deleteAction =>
          e.target?.dispatchEvent(newActionEvent(deleteAction))
        );
        this.dataSetItems!.forEach((item) => {
          item.selected = false;
        });
      }}
    ></mwc-button>`;
  }

  /**
   * Render a user selectable table of unreferenced datasets if any exist, otherwise indicate this is not an issue.
   * @returns html for table and action button.
   */
  private renderUnreferencedDataSets(): TemplateResult {
    const unreferencedDataSets: Element[] = [];
    Array.from(this.doc?.querySelectorAll('DataSet') ?? [])
      .filter(isPublic)
      .forEach(dataSet => {
        const parent = dataSet.parentElement;
        const name = dataSet.getAttribute('name');
        const isReferenced = Array.from(
          parent?.querySelectorAll(
            'GSEControl, ReportControl, SampledValueControl, LogControl'
          ) ?? []
        ).some(cb => cb.getAttribute('datSet') === name);

        if (parent && (!name || !isReferenced))
          unreferencedDataSets.push(dataSet);
      });
    this.unreferencedDataSets = identitySort(unreferencedDataSets);
    return html`
      <div>
        <h1>
          ${translate('cleanup.unreferencedDataSets.title')}
          (${unreferencedDataSets.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${translate('cleanup.unreferencedDataSets.tooltip')}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        <filtered-list multi class="dataSetList"
          >${Array.from(
            this.unreferencedDataSets.map(
              item => html`${this.renderListItem(item)}`
            )
          )}
        </filtered-list>
      </div>
      <footer>${this.renderDeleteButton()}</footer>
    `;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">${this.renderUnreferencedDataSets()}</section>
    `;
  }

  static styles = css`
    ${styles}

    section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media (max-width: 1200px) {
      footer {
        flex-direction: row;
      }

      mwc-check-list-item {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .editItem {
      --mdc-icon-size: 16px;
    }

    .editItem {
      visibility: hidden;
      opacity: 0;
    }

    .checkListItem:hover .editItem {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.5s linear;
    }

    .cleanupDeleteButton {
      float: right;
    }

    footer {
      margin: 16px;
      display: flex;
      flex-flow: row wrap;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      align-content: center;
    }

    filtered-list {
      max-height: 70vh;
      min-height: 20vh;
      overflow-y: scroll;
    }
  `;
}
