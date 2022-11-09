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
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-icon';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-checkbox';

import { Button } from '@material/mwc-button';
import { Checkbox } from '@material/mwc-checkbox';
import { List, MWCListIndex } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

import '../../filtered-list.js';

import {
  identity,
  isPublic,
  newLogEvent,
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

import { cleanSCLItems, identitySort, uniq } from './foundation.js';

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
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Boolean })
  disableControlClean = false;

  @property({ type: Array })
  unreferencedDataTypes: Element[] = [];

  @property({ attribute: false })
  selectedDataTypeItems: MWCListIndex | [] = [];

  @query('.delete-button')
  cleanButton!: Button;

  @query('.cleanup-list')
  cleanupList: List | undefined;

  @queryAll('mwc-check-list-item.cleanup-list-item')
  cleanupListItems: ListItem[] | undefined;

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
    this.cleanupList!.querySelectorAll(`.${selectorType}`).forEach(element => {
      element.classList.toggle('hiddenontypefilter');
      if (element.hasAttribute('disabled')) element.removeAttribute('disabled');
      else element.setAttribute('disabled', 'true');
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
      class="${classMap({
        'cleanup-list-item': true,
        't-lnode-type': dType.tagName === 'LNodeType',
        't-do-type': dType.tagName === 'DOType',
        't-da-type': dType.tagName === 'DAType',
        't-enum-type': dType.tagName === 'EnumType',
      })}"
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
   * Recurses through all datatype templates and indexes their usage.
   * @returns a map of data type templates usage by id.
   */
  private indexDataTypeTemplates(dttStart: Element[]) {
    const dataTypeFrequencyUsage = new Map<string, number>();

    // recursively fetch all usages
    const allUsages = this.fetchTree(dttStart);

    // make frequency count of datatype ids
    allUsages.forEach(item => {
      dataTypeFrequencyUsage.set(
        item,
        (dataTypeFrequencyUsage.get(item) || 0) + 1
      );
    });
    return dataTypeFrequencyUsage;
  }

  /**
   * Given a datatype reference return the appropriate datatype object or null.
   * @param element - the SCL Element for which a datatype is required.
   * @returns either the datatype or null.
   */
  private getSubType(element: Element): Element | null {
    const dataTypeTemplates = this.doc.querySelector(
      ':root > DataTypeTemplates'
    );
    const type = element.getAttribute('type');
    if (element.tagName === 'DO' || element.tagName === 'SDO') {
      return dataTypeTemplates!.querySelector(`DOType[id="${type}"]`);
    } else if (
      (element.tagName === 'DA' || element.tagName === 'BDA') &&
      element.getAttribute('bType') === 'Struct'
    ) {
      return dataTypeTemplates!.querySelector(`DAType[id="${type}"]`);
    } else if (
      (element.tagName === 'DA' || element.tagName === 'BDA') &&
      element.getAttribute('bType') === 'Enum'
    ) {
      return dataTypeTemplates!.querySelector(`EnumType[id="${type}"]`);
    }
    return null;
  }

  /**
   * Recurses from an initial element to find all child references (with duplicates).
   * @param rootElement - root SCL Element for which all child datatype references are required.
   * @returns the id value for all SCL element datatypes traversed.
   */
  private fetchTree(rootElements: Element[]): string[] {
    const elementStack = [...rootElements];
    const traversedElements: string[] = [];

    // A max stack depth is defined to avoid recursive references.
    const MAX_STACK_DEPTH = 300000;

    while (elementStack.length > 0 && elementStack.length <= MAX_STACK_DEPTH) {
      const currentElement = elementStack.pop();
      traversedElements.push(currentElement!.getAttribute('id')!);

      const selector = 'DO, SDO, DA, BDA';

      Array.from(currentElement!.querySelectorAll(selector))
        .filter(isPublic)
        .forEach(element => {
          const newElement = this.getSubType(element);
          if (newElement !== null) {
            elementStack.unshift(newElement);
          }
        });

      if (elementStack.length >= MAX_STACK_DEPTH) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('cleanup.unreferencedDataTypes.title'),
            message: get('cleanup.unreferencedDataTypes.stackExceeded', {
              maxStackDepth: MAX_STACK_DEPTH.toString(),
            }),
          })
        );
      }
    }

    return traversedElements;
  }

  /**
   * Get items from selection list and and any subtypes.
   * @returns An array of SCL elements representing selected items and subtypes as required.
   */
  public getCleanItems(): Element[] {
    const cleanItems = Array.from(
      (<Set<number>>this.selectedDataTypeItems).values()
    ).map(index => this.unreferencedDataTypes[index]);

    if (this.cleanSubTypesCheckbox!.checked === true) {
      const dataTypeTemplates = this.doc.querySelector(
        ':root > DataTypeTemplates'
      )!;

      const startingLNodeTypes = Array.from(
        dataTypeTemplates.querySelectorAll('LNodeType')
      );
      const dataTypeUsageCounter =
        this.indexDataTypeTemplates(startingLNodeTypes);

      /* Create usage counter for children of LNodeTypes that are used.
         We remember that _all_ valid template usages within a project 
        stem from LNodeTypes. */
      cleanItems.forEach(item => {
        if (item.tagName === 'LNodeType') {
          const childDataTypeTemplateIds = this.fetchTree([item]);
          childDataTypeTemplateIds.forEach(id => {
            dataTypeUsageCounter?.set(id, dataTypeUsageCounter.get(id)! - 1);
          });
        }
      });

      /* Check to see if children of unused DOType, DAType are present
         If so then unless they are from a data type which is part of 
         the main usage counter they can be safely removed.
         If they are part of the main usage counter, then this does not 
         need to be considered as these DOType and DAType elements are 
         dangling, they're usage is not relevant. */
      cleanItems.forEach(item => {
        if (['DOType', 'DAType'].includes(item.tagName)) {
          const unusedDataTypeTemplateChildrenIds = uniq(
            this.fetchTree([item])
          );
          unusedDataTypeTemplateChildrenIds.forEach(id => {
            if (dataTypeUsageCounter.get(<string>id) === undefined)
              cleanItems.push(dataTypeTemplates.querySelector(`[id="${id}"]`)!);
          });
        }
      });

      /* Now go through our usage index. If usage is zero then we can 
         remove the data type template safely. */
      dataTypeUsageCounter?.forEach((count, dataTypeId) => {
        if (count <= 0) {
          cleanItems.push(
            dataTypeTemplates.querySelector(`[id="${dataTypeId}"]`)!
          );
        }
      });
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
        this.cleanupListItems!.forEach((item) => {
          item.selected = false;
        });
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

    /* Make sure to type filter here
    .hidden is set on string filter in filtered-list and must always filter*/
    .cleanup-list-item.hiddenontypefilter:not(.hidden) {
      display: none;
    }

    /* filter disabled, Material Design guidelines for opacity */
    .t-da-type-filter,
    .t-enum-type-filter,
    .t-lnode-type-filter,
    .t-do-type-filter {
      opacity: 0.38;
    }
  `;
}
