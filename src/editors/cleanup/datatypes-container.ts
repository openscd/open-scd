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

/** An editor component for cleaning SCL DataType templates. */
@customElement('cleanup-datatypes')
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

  @query('.deleteButton')
  cleanButton!: Button;

  @query('.cleanupList')
  cleanupList: List | undefined;

  @queryAll('mwc-check-list-item.cleanupListItem')
  cleanupListItems: NodeList | undefined;

  @query('.cleanSubTypesCheckbox')
  cleanSubTypesCheckbox: Checkbox | undefined;

  @query('.tDATypeFilter')
  cleanupDATypeFilter!: Button;

  @query('.tEnumTypeFilter')
  cleanupEnumTypeFilter!: Button;

  @query('.tLNodeTypeFilter')
  cleanupLNodeTypeFilter!: Button;

  @query('.tDOTypeFilter')
  cleanupDOTypeFilter!: Button;

  /**
   * Toggle the class hidden in the unused data type list for use by filter buttons.
   * @param selectorType - class for selection to toggle the hidden class used by the list.
   */
  private toggleHiddenClass(selectorType: string) {
    this.cleanupList!.querySelectorAll(`.${selectorType}`).forEach(element => {
      element.classList.toggle('hidden');
    });
  }

  /**
   * Initial update after container is loaded.
   */
  async firstUpdated(): Promise<void> {
    this.cleanupList?.addEventListener('selected', () => {
      this.selectedDataTypeItems = this.cleanupList!.index;
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
      class="t${dataType}Filter filter"
      @click="${(e: MouseEvent) => {
        e.stopPropagation();
        this.toggleHiddenClass(`t${dataType}`);
      }}"
      >${getFilterIcon(iconMapping[dataType], true)}
      ${getFilterIcon(iconMapping[dataType], false)}
    </mwc-icon-button-toggle> `;
  }

  /**
   * Provide list item in the data type cleanup container.
   * @param dType - an unused SCL DataType element (LNodeType, DOType, DAType EnumType).
   * @returns html for checklist item.
   */
  private renderListItem(dType: Element): TemplateResult {
    return html`<mwc-check-list-item
      twoline
      class="cleanupListItem t${dType.tagName}"
      value="${identity(dType)}"
      graphic="large"
      ><span class="unreferencedControl">${dType.getAttribute('id')!} </span>
      <span>
        <mwc-icon-button
          label="Edit"
          icon="edit"
          class="editItem"
          @click="${(e: MouseEvent) => {
            e.stopPropagation();
            if (dType.tagName === 'LNodeType') {
              e.target?.dispatchEvent(
                newSubWizardEvent(
                  lNodeTypeWizard(<string>identity(dType), this.doc)
                )
              );
            } else if (dType.tagName === 'DAType') {
              e.target?.dispatchEvent(
                newSubWizardEvent(
                  editDaTypeWizard(<string>identity(dType), this.doc)
                )
              );
            } else if (dType.tagName === 'DOType') {
              e.target?.dispatchEvent(
                newSubWizardEvent(
                  dOTypeWizard(<string>identity(dType), this.doc)
                )
              );
            } else if (dType.tagName === 'EnumType') {
              e.target?.dispatchEvent(
                newSubWizardEvent(
                  eNumTypeEditWizard(<string>identity(dType), this.doc)
                )
              );
            }
          }}}"
        ></mwc-icon-button>
      </span>
      <span slot="secondary"
        >${dType.getAttribute('lnClass') ?? 'Unknown'}
      </span>
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
    console.log(cleanItems)
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
      class="deleteButton"
      label="${translate('cleanup.unreferencedDataTypes.deleteButton')} (${(<
        Set<number>
      >this.selectedDataTypeItems).size || '0'})"
      ?disabled=${(<Set<number>>this.selectedDataTypeItems).size === 0 ||
      (Array.isArray(this.selectedDataTypeItems) &&
        !this.selectedDataTypeItems.length)}
      @click=${(e: MouseEvent) => {
        const dataTypeItemsDeleteActions = cleanSCLItems(this.getCleanItems());
        dataTypeItemsDeleteActions.forEach(deleteAction =>
          e.target?.dispatchEvent(newActionEvent(deleteAction))
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
   * Checks if the list selection includes DOType or DAType elements which may have SDO or DA[bType=Struct] which references sub-elements.
   * @returns true if the selection contains DOType or DAType elements.
   */
  private selectionContainsDOOrDAType() {
    return Array.from(<Set<number>>this.selectedDataTypeItems).some(item =>
      ['DOType', 'DAType'].includes(this.unreferencedDataTypes[item]?.tagName)
    );
  }

  /**
   * Render a user selectable table of unreferenced DataTypes if any exist.
   * @returns html for table and action button.
   */
  private renderUnreferencedDataTypes() {
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
    this.unreferencedDataTypes = unreferencedLNTypes.concat(
      unreferencedDOTypes,
      unreferencedDATypes,
      unreferencedEnumTypes
    );

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
        <filtered-list multi class="cleanupList"
          >${Array.from(
            this.unreferencedDataTypes.map(uType => this.renderListItem(uType))
          )}
        </filtered-list>
      </div>
      <footer>
        ${this.renderDeleteButton()}
        <mwc-formfield
          class="removeFromCommunication"
          label="${translate(
            'cleanup.unreferencedDataTypes.alsoRemoveSubTypes'
          )}"
        >
          <mwc-checkbox
            checked
            class="cleanSubTypesCheckbox"
            ?disabled=${(<Set<number>>this.selectedDataTypeItems).size === 0 ||
            !(
              (<Set<number>>this.selectedDataTypeItems).size !== 0 &&
              this.selectionContainsDOOrDAType()
            )}
          ></mwc-checkbox
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

    .tDATypeFilter[on],
    .tEnumTypeFilter[on],
    .tLNodeTypeFilter[on],
    .tDOTypeFilter[on] {
      color: var(--secondary);
      opacity: 1;
    }

    /* items are disabled if the filter is deselected */
    .tDAType,
    .tEnumType,
    .tLogControl,
    .tReportControl {
      display: none;
    }

    /* items enabled if filter is selected */
    .tDATypeFilter[on] ~ .cleanupList > .tDAType,
    .tEnumTypeFilter[on] ~ .cleanupList > .tEnumType,
    .tLNodeTypeFilter[on] ~ .cleanupList > .tLNodeType,
    .tDOTypeFilter[on] ~ .cleanupList > .tDOType {
      display: flex;
    }

    /* filter disabled, Material Design guidelines for opacity */
    .tDATypeFilter,
    .tEnumTypeFilter,
    .tLNodeTypeFilter,
    .tDOTypeFilter {
      opacity: 0.38;
    }
  `;
}
