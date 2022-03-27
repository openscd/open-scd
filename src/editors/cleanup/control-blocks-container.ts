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
import { Button } from '@material/mwc-button';
import { Checkbox } from '@material/mwc-checkbox';
import '@material/mwc-icon';
import '@material/mwc-icon-button-toggle';
import { List, MWCListIndex } from '@material/mwc-list';
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

import {
  controlBlockIcons,
  getFilterIcon,
  iconType,
} from '../../icons/icons.js';

import { editGseControlWizard, getGSE } from '../../wizards/gsecontrol.js';
import { editReportControlWizard } from '../../wizards/reportcontrol.js';
import {
  editSampledValueControlWizard,
  getSMV,
} from '../../wizards/sampledvaluecontrol.js';

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

/** An editor component for cleaning SCL Control Blocks. */
@customElement('cleanup-control-blocks')
export class CleanupControlBlocks extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @property()
  disableControlClean = false;
  @property()
  _unreferencedControls: Element[] = [];
  @property()
  _selectedControlItems: MWCListIndex | [] = [];
  @query('.deleteButton')
  _cleanButton!: Button;
  @query('.cleanupList')
  _cleanupList: List | undefined;
  @queryAll('mwc-check-list-item.cleanupListItem')
  _cleanupListItems: NodeList | undefined;
  @query('.cleanupAddressCheckbox')
  _cleanupAddressCheckbox: Checkbox | undefined;
  @query('.tGSEControlFilter')
  _cleanupGSEControlFilter!: Button;
  @query('.tSampledValueControlFilter')
  _cleanupSampledValueControlFilter!: Button;
  @query('.tLogControlFilter')
  _cleanupLogControlFilter!: Button;
  @query('.tReportControlFilter')
  _cleanupReportControlFilter!: Button; 
  
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

  /**
   * Toggle the class hidden in the unused controls list for use by filter buttons.
   * @param selectorType - class for selection to toggle the hidden class used by the list.
   */
  private toggleHiddenClass(selectorType: string) {
    this._cleanupList!.querySelectorAll(`.${selectorType}`).forEach(element => {
      element.classList.toggle('hidden');
    });
  }

  /**
   * Create a button for filtering in the controlblock cleanup container.
   * @param controlType - SCL Control Type e.g. GSEControl.
   * @param initialState - boolean representing whether button is on or off.
   * @returns html for the icon button.
   */
  private createFilterIconButton(
    controlType: controlType,
    initialState = true
  ) {
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
   * @param cb - an unused SCL ControlBlock element.
   * @returns html for checklist item.
   */
  private getListItem(cb: Element) {
    return html`<mwc-check-list-item
      twoline
      class="cleanupListItem t${cb.nodeName}"
      value="${identity(cb)}"
      graphic="large"
      ><span class="unreferencedControl">${cb.getAttribute('name')!} </span>
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
        - ${cb.closest('IED')?.getAttribute('type') ?? 'No Type Defined'}</span
      >
      <mwc-icon slot="graphic">${controlBlockIcons[cb.nodeName]}</mwc-icon>
    </mwc-check-list-item>`;
  }

  /**
   * Provide delete button the control block cleanup container.
   * @returns html for the Delete Button of this container.
   */
  private getDeleteButton() {
    return html`<mwc-button
      outlined
      icon="delete"
      class="deleteButton"
      label="${translate('cleanup.unreferencedControls.deleteButton')} (${(<
        Set<number>
      >this._selectedControlItems).size || '0'})"
      ?disabled=${(<Set<number>>this._selectedControlItems).size === 0 ||
      (Array.isArray(this._selectedControlItems) &&
        !this._selectedControlItems.length)}
      @click=${(e: MouseEvent) => {
        const cleanItems = Array.from(
          (<Set<number>>this._selectedControlItems).values()
        ).map(index => this._unreferencedControls[index]);
        let addressItems: Delete[] = [];
        if (this._cleanupAddressCheckbox!.checked === true) {
          // TODO: To be truly complete other elements should also be checked, possibly
          // including: tServiceSettings, tReportSettings, tGSESettings, tSMVSettings
          // and ExtRef elements in the Inputs section
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
    ></mwc-button>`;
  }

  /**
   * Initial update after container is loaded.
   */
  async firstUpdated(): Promise<void> {
    this._cleanupList?.addEventListener('selected', () => {
      this._selectedControlItems = this._cleanupList!.index;
    });
    this.toggleHiddenClass('tReportControl');
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

    this._unreferencedControls = unreferencedCBs.sort((a, b) => {
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
          (${unreferencedCBs.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${translate('cleanup.unreferencedControls.tooltip')}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        ${this.createFilterIconButton('LogControl')}
        ${this.createFilterIconButton('ReportControl', false)}
        ${this.createFilterIconButton('GSEControl')}
        ${this.createFilterIconButton('SampledValueControl')}
        <filtered-list multi class="cleanupList"
          >${Array.from(unreferencedCBs.map(cb => this.getListItem(cb)))}
        </filtered-list>
      </div>
      <footer>
        ${this.getDeleteButton()}
        <mwc-formfield
          class="removeFromCommunication"
          label="${translate(
            'cleanup.unreferencedControls.alsoRemoveFromCommunication'
          )}"
        >
          <mwc-checkbox
            checked
            class="cleanupAddressCheckbox"
            ?disabled=${(<Set<number>>this._selectedControlItems).size === 0 ||
            (Array.isArray(this._selectedControlItems) &&
              !this._selectedControlItems.length)}
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
      max-height: 70vh;
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

    /* items are disabled if the filter is deselected */
    .tGSEControl,
    .tSampledValueControl,
    .tLogControl,
    .tReportControl {
      display: none;
    }

    /* items enabled if filter is selected */
    .tGSEControlFilter[on] ~ .cleanupList > .tGSEControl,
    .tSampledValueControlFilter[on] ~ .cleanupList > .tSampledValueControl,
    .tLogControlFilter[on] ~ .cleanupList > .tLogControl,
    .tReportControlFilter[on] ~ .cleanupList > .tReportControl {
      display: flex;
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
