import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { render } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { get } from 'lit-translate';

import '@material/mwc-icon-button';

import { Menu } from '@material/mwc-menu';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import {
  MultiSelectedEvent,
  SingleSelectedEvent,
} from '@material/mwc-list/mwc-list-foundation';

import './filtered-list.js';

import { FilteredList } from './filtered-list.js';

/** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
function compareSelection(a: ListItemBase, b: ListItemBase): number {
  if (a.disabled !== b.disabled) return b.disabled ? -1 : 1;
  if (a.selected !== b.selected) return a.selected ? -1 : 1;
  return 0;
}

/**
 * A mwc-list with mwc-textfield that filters the list items for given or separated terms
 */
@customElement('oscd-filter-button')
export class FilterButton extends LitElement {
  header!: TemplateResult | string;
  @property()
  selectedItems: string[] = [];
  @property({ type: Boolean })
  multi = false;
  @property()
  icon!: string;

  @state()
  private hideList = true;

  @query('filtered-list')
  private filteredList!: FilteredList;

  private toggleList(): void {
    this.hideList = !this.hideList;

    if (this.multi && !this.hideList) {
      const sortedItems = this.filteredList.items
        .sort((itemA, itemB) =>
          (itemA.textContent ?? '').localeCompare(itemB.textContent ?? '')
        )
        .sort(compareSelection);
      render(html`${sortedItems}`, this.filteredList);
    }
  }

  private selectSingleItem(evt: SingleSelectedEvent): void {
    this.selectedItems = [this.filteredList.items[evt.detail.index].value];
    this.fireSelectionChangedEvent();
  }

  private selectMultiItem(evt: MultiSelectedEvent): void {
    this.selectedItems = ((evt.target as Menu).selected as ListItemBase[]).map(
      item => item.value
    );
    this.fireSelectionChangedEvent();
  }

  private fireSelectionChangedEvent() {
    this.dispatchEvent(newSelectedItemsChangedEvent(this.selectedItems));
  }

  render(): TemplateResult {
    return html`
      <mwc-icon-button icon="${this.icon}" @click=${this.toggleList}>
      </mwc-icon-button>
      <div
        class="${classMap({
          listContainer: true,
          hidden: this.hideList,
        })}"
      >
        <h1>${this.header ? this.header : get('filter')}</h1>
        <filtered-list
          ?multi="${this.multi}"
          @selected=${this.multi ? this.selectMultiItem : this.selectSingleItem}
        >
          <slot></slot>
        </filtered-list>
      </div>
    `;
  }

  static styles = css`
    mwc-icon-button {
      padding: 8px;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }

    div.listContainer {
      box-shadow: 2px 2px 6px 6px var(--mdc-dialog-heading-ink-color);
      position: absolute;
      max-width: calc(100% - 200px);
      max-height: calc(100% - 240px);
      background-color: var(--mdc-theme-surface);
      overflow-y: auto;
      z-index: 5;
    }

    .hidden {
      display: none;
    }
  `;
}

export interface SelectedItemsChangedDetail {
  selectedItems: string[];
}
export type SelectedItemsChangedEvent = CustomEvent<SelectedItemsChangedDetail>;
export function newSelectedItemsChangedEvent(
  selectedItems: string[],
  eventInitDict?: CustomEventInit<SelectedItemsChangedDetail>
): SelectedItemsChangedEvent {
  return new CustomEvent<SelectedItemsChangedDetail>('selected-items-changed', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { selectedItems, ...eventInitDict?.detail },
  });
}

declare global {
  interface ElementEventMap {
    ['selected-items-changed']: SelectedItemsChangedEvent;
  }
}
