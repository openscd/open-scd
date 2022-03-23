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
import { Checkbox } from '@material/mwc-checkbox';
import '@material/mwc-icon';
import '@material/mwc-icon-button-toggle';
import { List, MWCListIndex } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-checkbox';
import '../filtered-list.js';

import { styles } from './templates/foundation.js';

import {
  Delete,
  identity,
  isPublic,
  newSubWizardEvent,
  newActionEvent,
} from '../foundation.js';

import { controlBlockIcons, getFilterIcon, iconType } from '../icons/icons.js';

import { editDataSetWizard } from '../wizards/dataset.js';
import { editGseControlWizard, getGSE } from '../wizards/gsecontrol.js';
import { editReportControlWizard } from '../wizards/reportcontrol.js';
import {
  editSampledValueControlWizard,
  getSMV,
} from '../wizards/sampledvaluecontrol.js';

const iconMapping = {
  GSEControl: <iconType>'gooseIcon',
  LogControl: <iconType>'logIcon',
  SampledValueControl: <iconType>'smvIcon',
  ReportControl: <iconType>'reportIcon',
};

/**
 * Check whether a control block is instantiated in the Communication section of the SCL file.
 * @param cb - SCL control block element.
 * @returns true or false if a GSE or SMV element exists under the Communication section.
 */
function getCommAddress(cb: Element): Element | null | undefined {
  if (cb.tagName === 'GSEControl') {
    return getGSE(cb);
  } else if (cb.tagName === 'SampledValueControl') {
    return getSMV(cb);
  }
  return null;
}

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
  _cleanUnreferencedControlsItems: ListItem | undefined;
  @query('.cleanupUnreferencedControlsAddress')
  _cleanUnreferencedControlsAddress: Checkbox | undefined;
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
    const unreferencedCBs: Element[] = [];
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
        if (parent && (!name || !isReferenced)) unreferencedCBs.push(cb);
      });

    this.unreferencedControls = unreferencedCBs.sort((a, b) => {
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
    console.log(controlBlockIcons['GSEControl']);
    return html`
      <div>
        <h1>
          ${translate('cleanup.unreferencedControls.title')}
          (${unreferencedCBs.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${translate('cleanup.unreferencedControls.tooltip')}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        <mwc-icon-button-toggle
          slot="graphic"
          label="filter"
          class="reportControlFilterIcon tLogControlFilter"
          on
          @click="${(e: MouseEvent) => {
            e.stopPropagation();
          }}"
          >${getFilterIcon(iconMapping['LogControl'], true)}
          ${getFilterIcon(iconMapping['LogControl'], false)}
        </mwc-icon-button-toggle>
        <mwc-icon-button-toggle
          slot="graphic"
          label="filter"
          class="reportControlFilterIcon tReportControlFilter"
          on
          @click="${(e: MouseEvent) => {
            e.stopPropagation();
          }}"
          >${getFilterIcon(iconMapping['ReportControl'], true)}
          ${getFilterIcon(iconMapping['ReportControl'], false)}
        </mwc-icon-button-toggle>
        <mwc-icon-button-toggle
          slot="graphic"
          label="filter"
          class="reportControlFilterIcon tGSEControlFilter"
          on
          @click="${(e: MouseEvent) => {
            e.stopPropagation();
          }}"
          >${getFilterIcon(iconMapping['GSEControl'], true)}
          ${getFilterIcon(iconMapping['GSEControl'], false)}
        </mwc-icon-button-toggle>
        <mwc-icon-button-toggle
          slot="graphic"
          label="filter"
          class="reportControlFilterIcon tSampledValueControlFilter"
          on
          @click="${(e: MouseEvent) => {
            e.stopPropagation();
          }}"
          >${getFilterIcon(iconMapping['SampledValueControl'], true)}
          ${getFilterIcon(iconMapping['SampledValueControl'], false)}
        </mwc-icon-button-toggle>
        <filtered-list multi class="cleanupUnreferencedControlsList"
          >${Array.from(
            unreferencedCBs.map(
              cb =>
                html`<mwc-check-list-item
                  twoline
                  class="cleanupUnreferencedControlsCheckListItem t${cb.nodeName}"
                  value="${identity(cb)}"
                  graphic="large"
                  ><span class="unreferencedControl"
                    >${cb.getAttribute('name')!}
                  </span>
                  <span>
                    <mwc-icon-button
                      label="Edit"
                      icon="edit"
                      class="editItem"
                      ?disabled="${cb.nodeName === 'LogControl'}"
                      @click=${(e: MouseEvent) => {
                        e.stopPropagation();
                        if (cb.nodeName === 'GSEControl') {
                          e.target?.dispatchEvent(
                            newSubWizardEvent(editGseControlWizard(cb))
                          );
                        } else if (cb.nodeName === 'ReportControl') {
                          e.target?.dispatchEvent(
                            newSubWizardEvent(editReportControlWizard(cb))
                          );
                        } else if (cb.nodeName === 'SampledValueControl') {
                          e.target?.dispatchEvent(
                            newSubWizardEvent(editSampledValueControlWizard(cb))
                          );
                        } else if (cb.nodeName === 'LogControl') {
                          // not implemented yet, disabled above
                        }
                      }}
                    ></mwc-icon-button>
                  </span>
                  <span>
                    <mwc-icon-button
                      label="warning"
                      icon="warning_amber"
                      class="cautionItem"
                      title="${translate(
                        'cleanup.unreferencedControls.addressDefinitionTooltip'
                      )}"
                      ?disabled="${!(getCommAddress(cb) !== null)}"
                    >
                    </mwc-icon-button>
                  </span>
                  <span slot="secondary"
                    >${cb.tagName} - ${cb.closest('IED')?.getAttribute('name')}
                    (${cb.closest('IED')?.getAttribute('manufacturer') ??
                    'No manufacturer defined'})
                    -
                    ${cb.closest('IED')?.getAttribute('type') ??
                    'No Type Defined'}</span
                  >
                  <mwc-icon slot="graphic"
                    >${controlBlockIcons[cb.nodeName]}</mwc-icon
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
            let addressItems: Delete[] = [];
            if (this._cleanUnreferencedControlsAddress!.checked === true) {
              addressItems = this.cleanSCLItems(
                cleanItems.map(cb => getCommAddress(cb)!).filter(Boolean)
              );
            }
            const deleteActions =
              this.cleanSCLItems(cleanItems).concat(addressItems);
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
        >
          <mwc-checkbox
            checked
            class="cleanupUnreferencedControlsAddress"
            ?disabled=${(<Set<number>>this.selectedControlItems).size === 0 ||
            (Array.isArray(this.selectedControlItems) &&
              !this.selectedControlItems.length)}
          ></mwc-checkbox
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
      padding: 20px;
      box-sizing: border-box;
      gap: 20px;
    }

    section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /* any more than 700px and distance between check box and item is too great */
      max-width: 700px;
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
      max-height: 70vh;
      overflow-y: scroll;
    }

    .tGSEControlFilter[on],
    .tSampledValueControlFilter[on],
    .tLogControlFilter[on],
    .tReportControlFilter[on]
     {
      color: var(--base3);
      opacity: 1;
    }

    .tGSEControl,
    .tSampledValueControl,
    .tLogControl,
    .tReportControl {
      display: none;
    }

    .tGSEControlFilter[on]
      ~ .cleanupUnreferencedControlsList > .tGSEControl,
      .tSampledValueControlFilter[on]
      ~ .cleanupUnreferencedControlsList > .tSampledValueControl,
      .tLogControlFilter[on]
      ~ .cleanupUnreferencedControlsList > .tLogControl,
      .tReportControlFilter[on]
      ~ .cleanupUnreferencedControlsList > .tReportControl {
      display: flex;
    }

    /* filter disabled, Material Design guidelines for opacity */
    .tGSEControlFilter, 
    .tSampledValueControlFilter,
    .tLogControlFilter,
    .tReportControlFilter
     {
      opacity: 0.38;
    }

    /* filter enabled */
    .tGSEControlFilter[on], 
    .tSampledValueControlFilter[on],
    .tLogControlFilter[on],
    .tReportControlFilter[on]
     {
      color: var(--secondary);
    }


  }

  `;
}
