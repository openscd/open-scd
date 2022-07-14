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
import { Checkbox } from '@material/mwc-checkbox';
import { List, MWCListIndex } from '@material/mwc-list';

import '../../filtered-list.js';

import {
  identity,
  isPublic,
  newSubWizardEvent,
  newActionEvent,
} from '../../foundation.js';
import { styles } from '../templates/foundation.js';
import {
  dataTypeTemplateIcons,
  getFilterIcon,
  iconType,
} from '../../icons/icons.js';

import { lNodeTypeWizard } from '../templates/lnodetype-wizard.js';
import { editDaTypeWizard } from '../templates/datype-wizards.js';
import { dOTypeWizard } from '../templates/dotype-wizards.js';
import { eNumTypeEditWizard } from '../templates/enumtype-wizard.js';

import { cleanSCLItems, identitySort, uniq, countBy } from './foundation.js';

type templateType = 'EnumType' | 'DAType' | 'DOType' | 'LNodeType';

const iconMapping = {
  EnumType: <iconType>'enumIcon',
  DAType: <iconType>'dAIcon',
  DOType: <iconType>'dOIcon',
  LNodeType: <iconType>'lNIcon',
};

const filterClassMapping: Record<string, string> = {
  EnumType: 'enum-type',
  DAType: 'da-type',
  DOType: 'do-type',
  LNodeType: 'lnode-type',
};

/** An editor component for cleaning SCL DataType templates. */
@customElement('cleanup-data-types')
export class CleanupDataTypes extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @property({ type: Boolean })
  disableControlClean = false;

  @property({ type: Array })
  unreferencedDataTypes: Element[] = [];

  @property()
  selectedDataTypeItems: MWCListIndex | [] = [];

  @query('.delete-button')
  cleanButton!: Button;

  @query('.cleanup-list')
  cleanupList: List | undefined;

  @queryAll('mwc-check-list-item.cleanup-list-item')
  cleanupListItems: NodeList | undefined;

  @query('.clean-sub-types-checkbox')
  cleanSubTypesCheckbox: Checkbox | undefined;

  @query('.t-da-type-filter')
  cleanupDATypeFilter!: Button;

  @query('.t-enum-type-filter')
  cleanupEnumTypeFilter!: Button;

  @query('.t-lnode-type-filter')
  cleanupLNodeTypeFilter!: Button;

  @query('.t-do-type-filter')
  cleanupDOTypeFilter!: Button;

  /**
   * Initial update after container is loaded.
   */
  async firstUpdated(): Promise<void> {
    this.cleanupList?.addEventListener('selected', () => {
      this.selectedDataTypeItems = this.cleanupList!.index;
    });
  }

  /**
   * Toggle the class hidden in the unused data type list for use by filter buttons to ensure selection works correctly.
   * @param selectorType - class for selection to toggle the hidden class used by the list.
   */
  private toggleHiddenClass(selectorType: string) {
    console.log(`.${selectorType}`);
    this.cleanupList!.querySelectorAll(`.${selectorType}`).forEach(element => {
      element.classList.toggle('hidden');
    });
  }

  /**
   * Create a button for filtering in the data type cleanup container.
   * @param dataType - SCL Data Type e.g. DOType.
   * @param initialState - boolean representing whether button is on or off.
   * @returns html for the icon button.
   */
  private renderFilterIconButton(
    dataType: templateType,
    initialState = true
  ): TemplateResult {
    return html`<mwc-icon-button-toggle
      slot="graphic"
      label="filter"
      ?on=${initialState}
      class="t-${filterClassMapping[dataType]}-filter filter"
      @click=${() => {
        this.toggleHiddenClass(`t-${filterClassMapping[dataType]}`);
      }}
      >${getFilterIcon(iconMapping[dataType], true)}
      ${getFilterIcon(iconMapping[dataType], false)}
    </mwc-icon-button-toggle>`;
  }

  /**
   * Opens an editor for a given data type.
   * @param dType - SCL datatype element.
   */
  private openDataTypeEditor(dType: Element) {
    if (dType.tagName === 'LNodeType') {
      this.dispatchEvent(
        newSubWizardEvent(lNodeTypeWizard(<string>identity(dType), this.doc))
      );
    } else if (dType.tagName === 'DAType') {
      this.dispatchEvent(
        newSubWizardEvent(editDaTypeWizard(<string>identity(dType), this.doc))
      );
    } else if (dType.tagName === 'DOType') {
      this.dispatchEvent(
        newSubWizardEvent(dOTypeWizard(<string>identity(dType), this.doc))
      );
    } else if (dType.tagName === 'EnumType') {
      this.dispatchEvent(
        newSubWizardEvent(eNumTypeEditWizard(<string>identity(dType), this.doc))
      );
    }
  }

  /**
   * Return secondary descriptive parameter for a data type.
   * @param dType - SCL datatype element.
   * @returns string with secondary descriptive parameter for a data type
   */
  private getDataTypeSecondaryText(dType: Element): string | null | undefined {
    if (dType.tagName === 'LNodeType') {
      return dType.getAttribute('lnClass');
    } else if (dType.tagName === 'DAType') {
      return dType.getAttribute('desc');
    } else if (dType.tagName === 'DOType') {
      return dType.getAttribute('cdc');
    } else if (dType.tagName === 'EnumType') {
      return dType.getAttribute('desc');
    }
    return 'Unknown';
  }

  /**
   * Provide list item in the data type cleanup container.
   * @param dType - an unused SCL DataType element (LNodeType, DOType, DAType EnumType).
   * @returns html for checklist item.
   */
  private renderListItem(dType: Element): TemplateResult {
    return html`<mwc-check-list-item
      twoline
      class="cleanup-list-item t-${filterClassMapping[dType.tagName]}"
      value="${identity(dType)}"
      graphic="large"
      ><span class="unreferenced-control">${dType.getAttribute('id')!} </span>
      <span>
        <mwc-icon-button
          label="Edit"
          icon="edit"
          class="edit-item"
          @click="${() => this.openDataTypeEditor(dType)}"
        ></mwc-icon-button>
      </span>
      <span slot="secondary">${this.getDataTypeSecondaryText(dType)} </span>
      <mwc-icon slot="graphic"
        >${dataTypeTemplateIcons[dType.tagName]}</mwc-icon
      >
    </mwc-check-list-item>`;
  }

  /**
   * Looks for Sub Data Object references within Data Objects. Each SDO is then
   * catalogued and the algorithm compares the cleanup selection against total number of the
   * elements in the document. If all usages are in the selection then a DOType which
   * is referenced in an SDO can also be removed and these types are returned.
   * @param dOType - A type to see if subtypes are defined which could be removed
   * @param searchNodes - A selection of nodes whose DO Types should be examined.
   * @returns A collection of SCL Elements only used in the selected DOs which can be removed.
   */
  private getUnusedSDOReferencedTypes(searchNodes: Element[]): Element[] | [] {
    let usedSDOTypes: string[] = [];
    let sdoTypes: string[] = [];
    // catalogue all SDOs in selection
    searchNodes
      .filter(node => node.tagName === 'DOType')
      .forEach(doType => {
        sdoTypes = Array.from(doType.querySelectorAll('SDO')).map(
          sdo => sdo.getAttribute('type')!
        );
        usedSDOTypes = usedSDOTypes.concat(sdoTypes);
      });
    // compare qty of SDO used in selection versus those used in document
    const removableItems: Element[] | [] = [];
    countBy(usedSDOTypes).forEach((doQty: number, doType: string) => {
      const docUsage = Array.from(
        this.doc.querySelectorAll(`DataTypeTemplates SDO[type="${doType}"]`)
      ).filter(isPublic);
      // if equal, all SDOs are in the selection
      if (doQty === docUsage.length) {
        removableItems.push(
          this.doc.querySelector(`DataTypeTemplates DOType[id="${doType}"]`)!
        );
      }
    });
    return removableItems;
  }

  /**
   * Looks for other DA references within BDA objects. Each BDA is then
   * catalogued and the algorithm compares the cleanup selection against total number of the
   * elements in the document. If all usages are in the selection then a DAType which
   * is referenced in a BDA can also be removed and these types are returned.
   * @param searchNodes - A selection of nodes whose BDA elements should be examined.
   * @returns A collection of SCL Elements only used in the selected DAs which can be removed.
   */
  private getUnusedBDAReferencedTypes(searchNodes: Element[]): Element[] | [] {
    let usedBDAStructTypes: string[] = [];
    let bdaStructTypes: string[] = [];
    // catalogue all BDAs in selection
    searchNodes
      .filter(node => node.tagName === 'DAType')
      .forEach(daType => {
        bdaStructTypes = Array.from(
          daType.querySelectorAll('BDA[bType="Struct"]')
        ).map(bda => bda.getAttribute('type')!);
        usedBDAStructTypes = usedBDAStructTypes.concat(bdaStructTypes);
      });
    // compare qty of BDA used in selection versus those used in document
    const removableItems: Element[] | [] = [];
    countBy(usedBDAStructTypes).forEach((bdaQty: number, bdaType: string) => {
      const docUsage = Array.from(
        this.doc.querySelectorAll(`DataTypeTemplates BDA[type="${bdaType}"]`)
      ).filter(isPublic);
      // if equal, all BDAs are in the selection
      if (bdaQty === docUsage.length) {
        removableItems.push(
          this.doc.querySelector(`DataTypeTemplates DAType[id="${bdaType}"]`)!
        );
      }
    });
    return removableItems;
  }

  /**
   * Get items from selection list and and any subtypes.
   * @returns An array of SCL elements representing selected items and subtypes as required.
   */
  public getCleanItems(): Element[] {
    let cleanItems = Array.from(
      (<Set<number>>this.selectedDataTypeItems).values()
    ).map(index => this.unreferencedDataTypes[index]);

    if (this.cleanSubTypesCheckbox!.checked === true) {
      cleanItems = cleanItems.concat(
        this.getUnusedSDOReferencedTypes(cleanItems)
      );
      cleanItems = cleanItems.concat(
        this.getUnusedBDAReferencedTypes(cleanItems)
      );
    }
    return cleanItems;
  }

  /**
   * Provide delete button the data type cleanup container.
   * @returns html for the Delete Button of this container.
   */
  private renderDeleteButton(): TemplateResult {
    return html`<mwc-button
      outlined
      icon="delete"
      class="delete-button"
      label="${translate('cleanup.unreferencedDataTypes.deleteButton')} (${(<
        Set<number>
      >this.selectedDataTypeItems).size || '0'})"
      ?disabled=${(<Set<number>>this.selectedDataTypeItems).size === 0 ||
      (Array.isArray(this.selectedDataTypeItems) &&
        !this.selectedDataTypeItems.length)}
      @click=${() => {
        const dataTypeItemsDeleteActions = cleanSCLItems(this.getCleanItems());
        dataTypeItemsDeleteActions.forEach(deleteAction =>
          this.dispatchEvent(newActionEvent(deleteAction))
        );
      }}
    ></mwc-button>`;
  }

  /**
   * Find unused types by scanning the SCL and comparing with the DataTypeTemplates.
   * @param usedSelector - CSS selector for SCL type's instantiated name, e.g. LN, LN0.
   * @param keyAttributeName - attribute name for SCL types uniqueness guarantee, e.g. lnType.
   * @param templateSelector - CSS selector for SCL template element in DataTypeTemplate section.
   * @returns an array of unreferenced elements sorted by their identity string.
   */
  private getUnusedType(
    usedSelector: string,
    keyAttributeName: string,
    templateSelector: string
  ) {
    const usedTypes = uniq(
      Array.from(this.doc?.querySelectorAll(usedSelector) ?? [])
        .filter(isPublic)
        .map(uType => uType.getAttribute(keyAttributeName))
    );

    const unreferencedTypes: Element[] = [];
    Array.from(
      this.doc?.querySelectorAll(`DataTypeTemplates > ${templateSelector}`) ??
        []
    )
      .filter(isPublic)
      .forEach(dType => {
        if (!usedTypes.includes(dType.getAttribute('id') ?? 'Unknown'))
          unreferencedTypes.push(dType);
      });
    return identitySort(unreferencedTypes);
  }

  /**
   * Find unused types by scanning the SCL and comparing with the DataTypeTemplates.
   * @returns an array of unreferenced elements
   */
  private getUnusedTypes() {
    const unreferencedLNTypes = this.getUnusedType(
      'LN, LN0',
      'lnType',
      'LNodeType'
    );
    const unreferencedDOTypes = this.getUnusedType('DO, SDO', 'type', 'DOType');
    const unreferencedDATypes = this.getUnusedType(
      'DA[bType="Struct"], BDA[bType="Struct"]',
      'type',
      'DAType'
    );
    const unreferencedEnumTypes = this.getUnusedType(
      'DA[bType="Enum"], BDA[bType="Enum"]',
      'type',
      'EnumType'
    );
    return unreferencedLNTypes.concat(
      unreferencedDOTypes,
      unreferencedDATypes,
      unreferencedEnumTypes
    );
  }

  /**
   * Render a user selectable table of unreferenced DataTypes if any exist.
   * @returns html for table and action button.
   */
  private renderUnreferencedDataTypes() {
    this.unreferencedDataTypes = this.getUnusedTypes();

    return html`
      <div>
        <h1>
          ${translate('cleanup.unreferencedDataTypes.title')}
          (${this.unreferencedDataTypes.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${translate('cleanup.unreferencedDataTypes.tooltip')}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        ${this.renderFilterIconButton('LNodeType')}
        ${this.renderFilterIconButton('DOType')}
        ${this.renderFilterIconButton('DAType')}
        ${this.renderFilterIconButton('EnumType')}
        <filtered-list multi class="cleanup-list"
          >${Array.from(
            this.unreferencedDataTypes.map(type => this.renderListItem(type))
          )}
        </filtered-list>
      </div>
      <footer>
        ${this.renderDeleteButton()}
        <mwc-formfield
          class="remove-from-communication"
          label="${translate(
            'cleanup.unreferencedDataTypes.alsoRemoveSubTypes'
          )}"
        >
          <mwc-checkbox checked class="clean-sub-types-checkbox"></mwc-checkbox
        ></mwc-formfield>
      </footer>
    `;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="1">${this.renderUnreferencedDataTypes()}</section>
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

    .edit-item {
      --mdc-icon-size: 16px;
      visibility: hidden;
      opacity: 0;
    }

    .cleanup-list-item:hover .edit-item {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.5s linear;
    }

    .edit-item[disabled] {
      display: none;
    }

    .delete-button {
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

    /* filter itself changes colour after click */
    .t-da-type-filter[on],
    .t-enum-type-filter[on],
    .t-lnode-type-filter[on],
    .t-do-type-filter[on] {
      color: var(--secondary);
      opacity: 1;
    }

    /* filter disabled, Material Design guidelines for opacity */
    .t-da-type-filter,
    .t-enum-type-filter,
    .t-lnode-type-filter,
    .t-do-type-filter {
      opacity: 0.38;
    }

    /* filter items are disabled by default (if the filter is deselected) */
    .t-da-type,
    .t-enum-type,
    .t-lnode-type,
    .t-do-type {
      display: none;
    }

    /* filter items enabled when filter is selected */
    .t-da-type-filter[on] ~ .cleanup-list > .t-da-type,
    .t-enum-type-filter[on] ~ .cleanup-list > .t-enum-type,
    .t-lnode-type-filter[on] ~ .cleanup-list > .t-lnode-type,
    .t-do-type-filter[on] ~ .cleanup-list > .t-do-type {
      display: flex;
    }
  `;
}
