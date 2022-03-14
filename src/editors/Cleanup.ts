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
import { Button } from '@material/mwc-button';
import { List, MWCListIndex } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

import {
  Delete,
  identity,
  isPublic,
  newSubWizardEvent,
  newActionEvent,
} from '../foundation.js';

import { editDataSetWizard } from '../wizards/dataset.js';
import { styles } from './templates/foundation.js';

/** An editor [[`plugin`]] for cleaning SCL references and definitions. */
export default class Cleanup extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  @property()
  disableDataSetClean = false;
  @property()
  unreferencedDataSets: Element[] = [];
  @property()
  selectedItems: MWCListIndex | [] = [];

  @query('.cleanupUnreferencedDataSetsDeleteButton')
  _cleanUnreferencedDataSetsButton!: Button;
  @query('.cleanupUnreferencedDataSetsList')
  _cleanUnreferencedDataSetsList: List | undefined;
  @queryAll('mwc-check-list-item')
  _cleanUnreferencedDataSetItems: ListItem[] | undefined;

  /**
   * Set a class variable for selected items to allow processing and UI interaction
   */
  private getSelectedUnreferencedDataSetItems() {
    this.selectedItems = (<List>(
      this.shadowRoot!.querySelector('.cleanupUnreferencedDataSetsList')
    )).index;
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
              html`<mwc-check-list-item twoline left value="${identity(item)}"
                ><span class="unreferencedDataSet"
                  >${item.getAttribute('name')!}
                </span>
                <span>
                  <mwc-icon-button
                    label="Edit"
                    icon="edit"
                    class="editUnreferencedDataSet"
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
      <footer>
        <mwc-button
          outlined
          icon="delete"
          class="cleanupUnreferencedDataSetsDeleteButton"
          label="${translate('cleanup.unreferencedDataSets.deleteButton')} (${(<
            Set<number>
          >this.selectedItems).size || '0'})"
          ?disabled=${(<Set<number>>this.selectedItems).size === 0 ||
          (Array.isArray(this.selectedItems) && !this.selectedItems.length)}
          slot="secondaryAction"
          @click=${(e: MouseEvent) => {
            const cleanItems = Array.from(
              (<Set<number>>this.selectedItems).values()
            ).map(index => this.unreferencedDataSets[index]);
            const deleteActions = this.cleanDataSets(cleanItems);
            deleteActions.forEach(deleteAction =>
              e.target?.dispatchEvent(newActionEvent(deleteAction))
            );
          }}
        ></mwc-button>
      </footer>
    `;
  }

  /**
   * Clean datasets as requested by removing DataSet elements specified by the user from the SCL file
   * @returns an actions array to support undo/redo
   */
  public cleanDataSets(cleanItems: Element[]): Delete[] {
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
      this.getSelectedUnreferencedDataSetItems();
    });
  }

  render(): TemplateResult {
    return html`
      <div class="cleanupUnreferencedDataSets">
        <section tabindex="0">${this.renderUnreferencedDataSets()}</section>
      </div>
    `;
  }

  static styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    .cleanupUnreferencedDataSets {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, 50%));
    }

    @media (max-width: 387px) {
      .cleanupUnreferencedDataSets {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }

    .editUnreferencedDataSet {
      --mdc-icon-size: 16px;
    }

    .cleanupUnreferencedDataSetsDeleteButton {
      float: right;
      margin-bottom: 10px;
      margin-right: 10px;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  `;
}
