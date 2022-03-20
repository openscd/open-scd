'use strict';

import {
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
import { Button } from '@material/mwc-button';
import { List, MWCListIndex } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-checkbox';
import '../filtered-list.js';

import {
  Delete,
  identity,
  isPublic,
  newSubWizardEvent,
  newActionEvent,
} from '../foundation.js';

import { editDataSetWizard } from '../wizards/dataset.js';
import { editGseControlWizard } from '../wizards/gsecontrol.js';
import { editSampledValueControlWizard } from '../wizards/sampledvaluecontrol.js';
import { editReportControlWizard } from '../wizards/reportcontrol.js';

import { styles } from './templates/foundation.js';

/** An editor [[`plugin`]] for cleaning SCL references and definitions. */
export default class Cleanup extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  // For DataSet Cleanup
  @property()
  disableDataSetClean = false;
  @property()
  unreferencedDataSets: Element[] = [];
  @property()
  selectedDatasetItems: MWCListIndex | [] = [];

  @query('.cleanupUnreferencedDataSetsDeleteButton')
  _cleanUnreferencedDataSetsButton!: Button;
  @query('.cleanupUnreferencedDataSetsList')
  _cleanUnreferencedDataSetsList: List | undefined;
  @queryAll('mwc-check-list-item.cleanupUnreferencedDataSetsCheckListItem')
  _cleanUnreferencedDataSetItems: ListItem[] | undefined;

  // For Control Cleanup
  @property()
  disableControlClean = false;
  @property()
  unreferencedControls: Element[] = [];
  @property()
  selectedControlItems: MWCListIndex | [] = [];
  @query('.cleanupUnreferencedControlsDeleteButton')
  _cleanUnreferencedControlsButton!: Button;
  @query('.cleanupUnreferencedControlsList')
  _cleanUnreferencedControlsList: List | undefined;
  @queryAll('mwc-check-list-item.cleanupUnreferencedControlsCheckListItem')
  _cleanUnreferencedControlsAddress: ListItem | undefined;
  @query('mwc-check-list-item.cleanupUnreferencedControlsAddress')
  
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
    this._cleanUnreferencedDataSetsList?.addEventListener('selected', () => {
      this.selectedDatasetItems = this._cleanUnreferencedDataSetsList!.index;
    });
    this._cleanUnreferencedControlsList?.addEventListener('selected', () => {
      this.selectedControlItems = this._cleanUnreferencedControlsList!.index;
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

    this.unreferencedDataSets = unreferencedDataSets.sort((a, b) => {
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
      <filtered-list multi class="cleanupUnreferencedDataSetsList"
        >${Array.from(
          unreferencedDataSets.map(
            item =>
              html`<mwc-check-list-item
                twoline
                left
                class="cleanupUnreferencedDataSetsCheckListItem"
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
          class="cleanupUnreferencedDataSetsDeleteButton cleanupDeleteButton"
          label="${translate('cleanup.unreferencedDataSets.deleteButton')} (${(<
            Set<number>
          >this.selectedDatasetItems).size || '0'})"
          ?disabled=${(<Set<number>>this.selectedDatasetItems).size === 0 ||
          (Array.isArray(this.selectedDatasetItems) &&
            !this.selectedDatasetItems.length)}
          @click=${(e: MouseEvent) => {
            const cleanItems = Array.from(
              (<Set<number>>this.selectedDatasetItems).values()
            ).map(index => this.unreferencedDataSets[index]);
            const deleteActions = this.cleanSCLItems(cleanItems);
            deleteActions.forEach(deleteAction =>
              e.target?.dispatchEvent(newActionEvent(deleteAction))
            );
          }}
        ></mwc-button>
      </footer>
    `;
  }

  /**
   * Render a user selectable table of unreferenced datasets if any exist, otherwise indicate this is not an issue.
   * @returns html for table and action button.
   */
  private renderUnreferencedControls() {
    const unreferencedControls: Element[] = [];
    // Control Blocks which can have a DataSet reference
    Array.from(
      this.doc?.querySelectorAll(
        'GSEControl, ReportControl, SampledValueControl, LogControl'
      ) ?? []
    )
      .filter(isPublic)
      .forEach(cb => {
        const parent = cb.parentElement;
        const name = cb.getAttribute('datSet');
        const isReferenced = parent?.querySelector(`DataSet[name=${name}]`);
        if (parent && (!name || !isReferenced)) unreferencedControls.push(cb);
      });

    this.unreferencedControls = unreferencedControls.sort((a, b) => {
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
          ${translate('cleanup.unreferencedControls.title')}
          (${unreferencedControls.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${translate('cleanup.unreferencedControls.tooltip')}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        <filtered-list
          multi
          class="cleanupUnreferencedControlsList"
          helper="hi dan"
          >${Array.from(
            unreferencedControls.map(
              item =>
                html`<mwc-check-list-item
                  twoline
                  left
                  class="cleanupUnreferencedControlsCheckListItem"
                  value="${identity(item)}"
                  ><span class="unreferencedControl"
                    >${item.getAttribute('name')!}
                  </span>
                  <span>
                    <mwc-icon-button
                      label="Edit"
                      icon="edit"
                      class="editItem"
                      ?disabled="${item.nodeName === 'LogControl'}"
                      @click=${(e: MouseEvent) => {
                        e.stopPropagation();
                        if (item.nodeName === 'GSEControl') {
                          e.target?.dispatchEvent(
                            newSubWizardEvent(editGseControlWizard(item))
                          );
                        } else if (item.nodeName === 'ReportControl') {
                          e.target?.dispatchEvent(
                            newSubWizardEvent(editReportControlWizard(item))
                          );
                        } else if (item.nodeName === 'SampledValueControl') {
                          e.target?.dispatchEvent(
                            newSubWizardEvent(
                              editSampledValueControlWizard(item)
                            )
                          );
                        } else if (item.nodeName === 'LogControl') {
                          // not implemented yet, disabled above
                        }
                      }}
                    ></mwc-icon-button>
                  </span>
                  <span>
                    <mwc-icon-button
                      icon="warning_amber"
                      class="cautionItem"
                      title="${translate(
                        'cleanup.unreferencedControls.addressDefinitionTooltip'
                      )}"
                    >
                    </mwc-icon-button>
                  </span>
                  <span slot="secondary"
                    >${item.tagName} -
                    ${item.closest('IED')?.getAttribute('name')}
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
          class="cleanupUnreferencedControlDeleteButton cleanupDeleteButton"
          label="${translate('cleanup.unreferencedControls.deleteButton')} (${(<
            Set<number>
          >this.selectedControlItems).size || '0'})"
          ?disabled=${(<Set<number>>this.selectedControlItems).size === 0 ||
          (Array.isArray(this.selectedControlItems) &&
            !this.selectedControlItems.length)}
          @click=${(e: MouseEvent) => {
            const cleanItems = Array.from(
              (<Set<number>>this.selectedControlItems).values()
            ).map(index => this.unreferencedControls[index]);
            const deleteActions = this.cleanSCLItems(cleanItems);
            deleteActions.forEach(deleteAction =>
              e.target?.dispatchEvent(newActionEvent(deleteAction))
            );
          }}
        ></mwc-button>
        <mwc-formfield
          class="removeFromCommunication"
          label="${translate(
            'cleanup.unreferencedControls.alsoRemoveFromCommunication'
          )}"
          tooltip="${translate(
            'cleanup.unreferencedControls.alsoRemoveFromCommunicationTooltip'
          )}"
          ><mwc-checkbox checked class="cleanupUnreferencedControlsAddress" ?disabled=${(<Set<number>>this.selectedControlItems).size === 0 ||
            (Array.isArray(this.selectedControlItems) &&
              !this.selectedControlItems.length)}></mwc-checkbox
        ></mwc-formfield>
      </footer>
    `;
  }

  render(): TemplateResult {
    return html`
      <div class="cleanup">
        <section tabindex="0">${this.renderUnreferencedDataSets()}</section>
        <section tabindex="1">${this.renderUnreferencedControls()}</section>
      </div>
    `;
  }

  static styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    @media (max-width: 800px) {
      .cleanup {
        flex-direction: column;
      }

      footer {
        flex-direction: row;
      }

      mwc-check-list-item {
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .cleanup {
      display: flex;
      flex-wrap: wrap;
      /* See: https://css-tricks.com/responsive-layouts-fewer-media-queries/ */
      flex: clamp(100%/3 + 0.1%, (400px - 100hw) * 1000, 100%);
      padding: 8px 12px 16px;
      box-sizing: border-box;
      gap: 20px;
    }

    section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .editItem,
    .cautionItem {
      --mdc-icon-size: 16px;
    }

    .cautionItem {
      color: var(--yellow);
    }

    .cautionItem[disabled],
    .editItem[disabled] {
      display: none;
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
      max-height: 120vh;
      overflow-y: scroll;
    }
  `;
}
