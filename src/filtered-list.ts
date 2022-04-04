import {
  css,
  customElement,
  html,
  state,
  property,
  query,
  TemplateResult,
  unsafeCSS,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { List } from '@material/mwc-list';
import { ListBase } from '@material/mwc-list/mwc-list-base';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { TextField } from '@material/mwc-textfield';

function slotItem(item: Element): Element {
  if (!item.closest('filtered-list') || !item.parentElement) return item;
  if (item.parentElement instanceof FilteredList) return item;
  return slotItem(item.parentElement);
}

function hideFiltered(item: ListItemBase, searchText: string): void {
  const itemInnerText = item.innerText + '\n';
  const childInnerText = Array.from(item.children)
    .map(child => (<HTMLElement>child).innerText)
    .join('\n');
  const filterTarget: string = (itemInnerText + childInnerText).toUpperCase();

  const terms: string[] = searchText.toUpperCase().split(' ');

  terms.some(term => !filterTarget.includes(term))
    ? slotItem(item).classList.add('hidden')
    : slotItem(item).classList.remove('hidden');
}

/**
 * A mwc-list with mwc-textfield that filters the list items for given or separated terms
 */
@customElement('filtered-list')
export class FilteredList extends ListBase {
  /** search mwc-textfield label property */
  @property({ type: String })
  searchFieldLabel?: string;
  /** Whether the check all option (checkbox next to search text field) is activated */
  @property({ type: Boolean })
  disableCheckAll = false;

  @state()
  private get existCheckListItem(): boolean {
    return this.items.some(item => item instanceof CheckListItem);
  }

  @state()
  private get isAllSelected(): boolean {
    return this.items
      .filter(item => !item.disabled)
      .filter(item => item instanceof CheckListItem)
      .every(checkItem => checkItem.selected);
  }

  @state()
  private get isSomeSelected(): boolean {
    return this.items
      .filter(item => !item.disabled)
      .filter(item => item instanceof CheckListItem)
      .some(checkItem => checkItem.selected);
  }

  @query('mwc-textfield') searchField!: TextField;

  private onCheckAll(): void {
    const select = !this.isAllSelected;
    this.items
      .filter(item => !item.disabled && !item.classList.contains('hidden'))
      .forEach(item => (item.selected = select));
  }

  onFilterInput(): void {
    Array.from(
      this.querySelectorAll(
        'mwc-list-item, mwc-check-list-item, mwc-radio-list-item'
      )
    )
      .filter(item => !(item as ListItemBase).noninteractive)
      .forEach(item =>
        hideFiltered(item as ListItemBase, this.searchField.value)
      );
  }

  protected onListItemConnected(e: CustomEvent): void {
    super.onListItemConnected(e);
    this.requestUpdate();
  }

  constructor() {
    super();
    this.addEventListener('selected', () => {
      this.requestUpdate();
    });
  }

  private renderCheckAll(): TemplateResult {
    return this.existCheckListItem && !this.disableCheckAll
      ? html`<mwc-formfield class="checkall"
          ><mwc-checkbox
            ?indeterminate=${!this.isAllSelected && this.isSomeSelected}
            ?checked=${this.isAllSelected}
            @change=${() => {
              this.onCheckAll();
            }}
          ></mwc-checkbox
        ></mwc-formfield>`
      : html``;
  }

  render(): TemplateResult {
    return html`<div id="tfcontainer">
        <abbr title="${this.searchFieldLabel ?? translate('filter')}"
          ><mwc-textfield
            label="${this.searchFieldLabel ?? ''}"
            iconTrailing="search"
            outlined
            @input=${() => this.onFilterInput()}
          ></mwc-textfield
        ></abbr>
        ${this.renderCheckAll()}
      </div>
      ${super.render()}`;
  }

  static styles = css`
    ${unsafeCSS(List.styles)}

    #tfcontainer {
      display: flex;
      flex: auto;
    }

    ::slotted(.hidden) {
      display: none;
    }

    abbr {
      display: flex;
      flex: auto;
      margin: 8px;
      text-decoration: none;
      border-bottom: none;
    }

    mwc-textfield {
      width: 100%;
      --mdc-shape-small: 28px;
    }

    mwc-formfield.checkall {
      padding-right: 8px;
    }

    .mdc-list {
      padding-inline-start: 0px;
    }
  `;
}
