import {
  css,
  customElement,
  html,
  property,
  query,
  TemplateResult,
  unsafeCSS,
} from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-icon-button';
import '@material/mwc-dialog';

import './filtered-list.js';

import { FilteredList } from './filtered-list.js';
import { Dialog } from '@material/mwc-dialog';

// /** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
// function compareSelection(a: ListItemBase, b: ListItemBase): number {
//   if (a.disabled !== b.disabled) return b.disabled ? -1 : 1;
//   if (a.selected !== b.selected) return a.selected ? -1 : 1;
//   return 0;
// }

/**
 * A mwc-list with mwc-textfield that filters the list items for given or separated terms
 */
@customElement('oscd-filter-button')
export class FilterButton extends FilteredList {
  @property()
  header!: TemplateResult | string;
  @property()
  icon!: string;

  @query('#filterDialog')
  private filterDialog!: Dialog;

  private toggleList(): void {
    this.filterDialog.show();
    //
    // if (this.multi) {
    //   const sortedItems = this.items
    //     .sort((itemA, itemB) =>
    //       (itemA.textContent ?? '').localeCompare(itemB.textContent ?? '')
    //     )
    //     .sort(compareSelection);
    //   render(html`${sortedItems}`, this);
    // }
  }

  private onClosing(): void {
    const selectedItems: string[] = [];
    if (this.selected) {
      if (this.selected instanceof Array) {
        this.selected.forEach(item => selectedItems.push(item.value));
        this.dispatchEvent(newSelectedItemsChangedEvent(selectedItems));
      } else {
        selectedItems.push(this.selected.value);
        this.dispatchEvent(newSelectedItemsChangedEvent(selectedItems));
      }
    }
  }

  render(): TemplateResult {
    return html`
      <mwc-icon-button icon="${this.icon}" @click=${this.toggleList}>
      </mwc-icon-button>
      <mwc-dialog
        id="filterDialog"
        heading="${this.header ? this.header : get('filter')}"
        scrimClickAction=""
        @closing="${() => this.onClosing()}"
      >
        ${super.render()}
        <mwc-button slot="primaryAction" dialogAction="close">
          ${translate('close')}
        </mwc-button>
      </mwc-dialog>
    `;
  }

  static styles = css`
    ${unsafeCSS(FilteredList.styles)}

    mwc-icon-button {
      color: var(--mdc-theme-on-surface);
    }

    mwc-dialog {
      --mdc-dialog-max-height: calc(100vh - 150px);
    }
  `;
}

export interface SelectedItemsChangedDetail {
  selectedItems: string[];
}
export type SelectedItemsChangedEvent = CustomEvent<SelectedItemsChangedDetail>;
function newSelectedItemsChangedEvent(
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
