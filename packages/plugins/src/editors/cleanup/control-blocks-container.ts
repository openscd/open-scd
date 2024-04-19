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
import { classMap } from 'lit-html/directives/class-map';
import { get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-icon';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-checkbox';

import { Button } from '@material/mwc-button';
import { Checkbox } from '@material/mwc-checkbox';
import { List, MWCListIndex } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

import '@openscd/open-scd/src/filtered-list.js';

import {
  identity,
  isPublic,
  newSubWizardEvent,
} from '@openscd/open-scd/src/foundation.js';
import { Delete, newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { styles } from '../templates/foundation.js';
import {
  controlBlockIcons,
  getFilterIcon,
  iconType,
} from '@openscd/open-scd/src/icons/icons.js';
import { editGseControlWizard, getGSE } from '../../wizards/gsecontrol.js';
import { editReportControlWizard } from '../../wizards/reportcontrol.js';
import {
  editSampledValueControlWizard,
  getSMV,
} from '../../wizards/sampledvaluecontrol.js';
import { cleanSCLItems, identitySort } from './foundation.js';

type controlType =
  | 'GSEControl'
  | 'LogControl'
  | 'SampledValueControl'
  | 'ReportControl';

const iconMapping = {
  GSEControl: <iconType>'gooseIcon',
  LogControl: <iconType>'logIcon',
  SampledValueControl: <iconType>'smvIcon',
  ReportControl: <iconType>'reportIcon',
};

/**
 * Check whether a control block is instantiated in the Communication section of the SCL file.
 * @param controlBlock - SCL control block element.
 * @returns true or false if a GSE or SMV element exists under the Communication section.
 */
function getCommAddress(controlBlock: Element): Element | null | undefined {
  if (controlBlock.tagName === 'GSEControl') {
    return getGSE(controlBlock);
  } else if (controlBlock.tagName === 'SampledValueControl') {
    return getSMV(controlBlock);
  }
  return null;
}

/** An editor component for cleaning SCL Control Blocks. */
@customElement('cleanup-control-blocks')
export class CleanupControlBlocks extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Boolean })
  disableControlClean = false;

  @property({ type: Array })
  unreferencedControls: Element[] = [];

  @property({ attribute: false })
  selectedControlItems: MWCListIndex | [] = [];

  @query('.deleteButton')
  cleanButton!: Button;

  @query('.cleanupList')
  cleanupList: List | undefined;

  @queryAll('mwc-check-list-item.cleanupListItem')
  cleanupListItems: ListItem[] | undefined;

  @query('.cleanupAddressCheckbox')
  cleanupAddressCheckbox: Checkbox | undefined;

  @query('.tGSEControlFilter')
  cleanupGSEControlFilter!: Button;

  @query('.tSampledValueControlFilter')
  cleanupSampledValueControlFilter!: Button;

  @query('.tLogControlFilter')
  cleanupLogControlFilter!: Button;

  @query('.tReportControlFilter')
  cleanupReportControlFilter!: Button;

  /**
   * Toggle the class hidden in the unused controls list for use by filter buttons.
   * @param selectorType - class for selection to toggle the hidden class used by the list.
   */
  private toggleHiddenClass(selectorType: string) {
    this.cleanupList!.querySelectorAll(`.${selectorType}`).forEach(element => {
      element.classList.toggle('hiddenontypefilter');
      if (element.hasAttribute('disabled')) element.removeAttribute('disabled');
      else element.setAttribute('disabled', 'true');
    });
  }

  /**
   * Initial update after container is loaded.
   */
  async firstUpdated(): Promise<void> {
    this.cleanupList?.addEventListener('selected', () => {
      this.selectedControlItems = this.cleanupList!.index;
    });
    this.toggleHiddenClass('tReportControl');
  }

  /**
   * Create a button for filtering in the control block cleanup container.
   * @param controlType - SCL Control Type e.g. GSEControl.
   * @param initialState - boolean representing whether button is on or off.
   * @returns html for the icon button.
   */
  private renderFilterIconButton(
    controlType: controlType,
    initialState = true
  ): TemplateResult {
    return html`<mwc-icon-button-toggle
      slot="graphic"
      label="filter"
      ?on=${initialState}
      class="t${controlType}Filter"
      @click="${(e: MouseEvent) => {
        e.stopPropagation();
        this.toggleHiddenClass(`t${controlType}`);
      }}"
      >${getFilterIcon(iconMapping[controlType], true)}
      ${getFilterIcon(iconMapping[controlType], false)}
    </mwc-icon-button-toggle> `;
  }

  /**
   * Provide list item in the control block cleanup container.
   * @param controlBlock - an unused SCL ControlBlock element.
   * @returns html for checklist item.
   */
  private renderListItem(controlBlock: Element): TemplateResult {
    return html`<mwc-check-list-item
      twoline
      class="${classMap({
        cleanupListItem: true,
        tReportControl: controlBlock.tagName === 'ReportControl',
        tLogControl: controlBlock.tagName === 'LogControl',
        tGSEControl: controlBlock.tagName === 'GSEControl',
        tSampledValueControl: controlBlock.tagName === 'SampledValueControl',
      })}"
      value="${identity(controlBlock)}"
      graphic="large"
      ><span class="unreferencedControl"
        >${controlBlock.getAttribute('name')!}
      </span>
      <span>
        <mwc-icon-button
          label="warning"
          icon="warning_amber"
          class="cautionItem"
          title="${get(
            'cleanup.unreferencedControls.addressDefinitionTooltip'
          )}"
          ?disabled="${!(getCommAddress(controlBlock) !== null)}"
        >
        </mwc-icon-button>
      </span>
      <span>
        <mwc-icon-button
          label="Edit"
          icon="edit"
          class="editItem"
          ?disabled="${controlBlock.tagName === 'LogControl'}"
          @click=${(e: MouseEvent) => {
            e.stopPropagation();
            if (controlBlock.tagName === 'GSEControl') {
              e.target?.dispatchEvent(
                newSubWizardEvent(editGseControlWizard(controlBlock))
              );
            } else if (controlBlock.tagName === 'ReportControl') {
              e.target?.dispatchEvent(
                newSubWizardEvent(editReportControlWizard(controlBlock))
              );
            } else if (controlBlock.tagName === 'SampledValueControl') {
              e.target?.dispatchEvent(
                newSubWizardEvent(editSampledValueControlWizard(controlBlock))
              );
            } else if (controlBlock.tagName === 'LogControl') {
              // not implemented yet, disabled above
            }
          }}
        ></mwc-icon-button>
      </span>
      <span slot="secondary"
        >${controlBlock.tagName} -
        ${controlBlock.closest('IED')?.getAttribute('name')}
        (${controlBlock.closest('IED')?.getAttribute('manufacturer') ??
        'No manufacturer defined'})
        -
        ${controlBlock.closest('IED')?.getAttribute('type') ??
        'No Type Defined'}</span
      >
      <mwc-icon slot="graphic"
        >${controlBlockIcons[controlBlock.tagName]}</mwc-icon
      >
    </mwc-check-list-item>`;
  }

  /**
   * Provide delete button the control block cleanup container.
   * @returns html for the Delete Button of this container.
   */
  private renderDeleteButton(): TemplateResult {
    const sizeSelectedItems = (<Set<number>>this.selectedControlItems).size;

    return html`<mwc-button
      outlined
      icon="delete"
      class="deleteButton"
      label="${get(
        'cleanup.unreferencedControls.deleteButton'
      )} (${sizeSelectedItems || '0'})"
      ?disabled=${(<Set<number>>this.selectedControlItems).size === 0 ||
      (Array.isArray(this.selectedControlItems) &&
        !this.selectedControlItems.length)}
      @click=${(e: MouseEvent) => {
        const cleanItems = Array.from(
          (<Set<number>>this.selectedControlItems).values()
        ).map(index => this.unreferencedControls[index]);
        let gseSmvAddressItems: Delete[] = [];
        if (this.cleanupAddressCheckbox!.checked === true) {
          // TODO: To be truly complete other elements should also be checked, possibly
          // including: tServiceSettings, tReportSettings, tGSESettings, tSMVSettings
          gseSmvAddressItems = cleanSCLItems(
            cleanItems.map(cb => getCommAddress(cb)!).filter(Boolean)
          );
        }
        const gseSmvLogReportDeleteActions =
          cleanSCLItems(cleanItems).concat(gseSmvAddressItems);
        gseSmvLogReportDeleteActions.forEach(deleteAction =>
          e.target?.dispatchEvent(newActionEvent(deleteAction))
        );
        this.cleanupListItems!.forEach(item => {
          item.selected = false;
        });
      }}
    ></mwc-button>`;
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
        const isReferenced = parent?.querySelector(`DataSet[name="${name}"]`);
        if (parent && (!name || !isReferenced)) unreferencedCBs.push(cb);
      });
    this.unreferencedControls = identitySort(unreferencedCBs);
    return html`
      <div>
        <h1>
          ${get('cleanup.unreferencedControls.title')}
          (${unreferencedCBs.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${get('cleanup.unreferencedControls.tooltip')}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        ${this.renderFilterIconButton('LogControl')}
        ${this.renderFilterIconButton('ReportControl', false)}
        ${this.renderFilterIconButton('GSEControl')}
        ${this.renderFilterIconButton('SampledValueControl')}
        <filtered-list multi class="cleanupList"
          >${Array.from(unreferencedCBs.map(cb => this.renderListItem(cb)))}
        </filtered-list>
      </div>
      <footer>
        ${this.renderDeleteButton()}
        <mwc-formfield
          class="removeFromCommunication"
          label="${get(
            'cleanup.unreferencedControls.alsoRemoveFromCommunication'
          )}"
        >
          <mwc-checkbox
            checked
            class="cleanupAddressCheckbox"
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
      <section tabindex="1">${this.renderUnreferencedControls()}</section>
    `;
  }

  static styles = css`
    ${styles}

    section {
      display: flex;
      flex: 1;
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

    .editItem,
    .cautionItem {
      --mdc-icon-size: 16px;
    }

    .editItem {
      visibility: hidden;
      opacity: 0;
    }

    .cleanupListItem:hover .editItem {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.5s linear;
    }

    .cautionItem {
      color: var(--yellow);
    }

    .cautionItem[disabled],
    .editItem[disabled] {
      display: none;
    }

    .deleteButton {
      float: right;
    }

    footer {
      align-items: center;
      align-content: center;
      display: flex;
      flex-flow: row wrap;
      flex-direction: row-reverse;
      justify-content: space-between;
      margin: 16px;
    }

    filtered-list {
      min-height: 20vh;
      overflow-y: scroll;
    }

    .tGSEControlFilter[on],
    .tSampledValueControlFilter[on],
    .tLogControlFilter[on],
    .tReportControlFilter[on] {
      color: var(--secondary);
      opacity: 1;
    }

    /* Make sure to type filter here
    .hidden is set on string filter in filtered-list and must always filter*/
    .cleanupListItem.hiddenontypefilter:not(.hidden) {
      display: none;
    }

    /* filter disabled, Material Design guidelines for opacity */
    .tGSEControlFilter,
    .tSampledValueControlFilter,
    .tLogControlFilter,
    .tReportControlFilter {
      opacity: 0.38;
    }
  `;
}
