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

import { editDataSetWizard } from '../../wizards/dataset.js';

import '@material/mwc-button';
import { Button } from '@material/mwc-button';
import '@material/mwc-icon';
import '@material/mwc-icon-button-toggle';
import { List, MWCListIndex } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-checkbox';
import '../../filtered-list.js';

import { styles } from '../templates/foundation.js';

import {
  Delete,
  identity,
  isPublic,
  newSubWizardEvent,
  newActionEvent,
} from '../../foundation.js';

/** An editor component for cleaning SCL datasets. */
@customElement('cleanup-datasets')
export class CleanupDatasets extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @property()
  _disableDataSetClean = false;
  @property()
  _unreferencedDataSets: Element[] = [];
  @property()
  _selectedDatasetItems: MWCListIndex | [] = [];

  @query('.deleteButton')
  _cleanupButton!: Button;
  @query('.dataSetList')
  _dataSetList: List | undefined;
  @queryAll('mwc-check-list-item.checkListItem')
  _dataSetItems: ListItem[] | undefined;

  /**
   * Clean datasets as requested by removing SCL elements specified by the user from the SCL file
   * @returns an actions array to support undo/redo
   */
  public cleanSCLItems(cleanItems: Element[]): Delete[] {
    const actions: Delete[] = [];
    if (cleanItems) {
      cleanItems.forEach(item => {
        actions.push({
          old: {
            parent: <Element>item.parentElement!,
            element: item,
            reference: <Node | null>item!.nextSibling,
          },
        });
      });
    }
    return actions;
  }

  async firstUpdated(): Promise<void> {
    this._dataSetList?.addEventListener('selected', () => {
      this._selectedDatasetItems = this._dataSetList!.index;
    });
  }

  /**
   * Render a user selectable table of unreferenced datasets if any exist, otherwise indicate this is not an issue.
   * @returns html for table and action button.
   */
  private renderUnreferencedDataSets() {
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

    this._unreferencedDataSets = unreferencedDataSets.sort((a, b) => {
      // sorting using the identity ensures sort order includes IED
      const aId = identity(a);
      const bId = identity(b);
      if (aId < bId) {
        return -1;
      }
      if (aId > bId) {
        return 1;
      }
      // names must be equal
      return 0;
    });

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
            unreferencedDataSets.map(
              item =>
                html`<mwc-check-list-item
                  twoline
                  class="checkListItem"
                  value="${identity(item)}"
                  ><span class="unreferencedDataSet"
                    >${item.getAttribute('name')!}
                  </span>
                  <span>
                    <mwc-icon-button
                      label="Edit"
                      icon="edit"
                      class="editUnreferencedDataSet editItem"
                      @click=${(e: MouseEvent) => {
                        e.stopPropagation();
                        e.target?.dispatchEvent(
                          newSubWizardEvent(() => editDataSetWizard(item))
                        );
                      }}
                    ></mwc-icon-button>
                  </span>
                  <span slot="secondary"
                    >${item.closest('IED')?.getAttribute('name')}
                    (${item.closest('IED')?.getAttribute('manufacturer') ??
                    'No manufacturer defined'})
                    -
                    ${item.closest('IED')?.getAttribute('type') ??
                    'No Type Defined'}</span
                  >
                </mwc-check-list-item>`
            )
          )}
        </filtered-list>
      </div>
      <footer>
        <mwc-button
          outlined
          icon="delete"
          class="deleteButton cleanupDeleteButton"
          label="${translate('cleanup.unreferencedDataSets.deleteButton')} (${(<
            Set<number>
          >this._selectedDatasetItems).size || '0'})"
          ?disabled=${(<Set<number>>this._selectedDatasetItems).size === 0 ||
          (Array.isArray(this._selectedDatasetItems) &&
            !this._selectedDatasetItems.length)}
          @click=${(e: MouseEvent) => {
            const cleanItems = Array.from(
              (<Set<number>>this._selectedDatasetItems).values()
            ).map(index => this._unreferencedDataSets[index]);
            const deleteActions = this.cleanSCLItems(cleanItems);
            deleteActions.forEach(deleteAction =>
              e.target?.dispatchEvent(newActionEvent(deleteAction))
            );
          }}
        ></mwc-button>
      </footer>
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
