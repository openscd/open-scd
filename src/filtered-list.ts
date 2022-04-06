import {
  css,
  customElement,
  html,
  state,
  property,
  query,
  TemplateResult,
  unsafeCSS,
  queryAll,
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
import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';

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
  /** Wether noninteractives shall be filtered via select menu */
  @property({ type: Boolean })
  filterNoninteractives = false;

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
  @query('mwc-menu') filterMenu!: Menu;
  @query('mwc-icon-button[icon="filter_list"]') filterButton!: IconButton;
  @queryAll('mwc-menu > mwc-check-list-item[selected]')
  filterItems!: ListItemBase[];

  private filterItem(): void {
    if (this.filterItems.length === 0) {
      this.querySelectorAll(
        'mwc-list-item,mwc-check-list-item,mwc-radio-list-item,li'
      ).forEach(item => item.classList.remove('filter'));

      return;
    }

    this.querySelectorAll(
      'mwc-list-item,mwc-check-list-item,mwc-radio-list-item,li'
    ).forEach(item => item.classList.add('filter'));

    const noniacts = <ListItemBase[]>(
      Array.from(
        this.querySelectorAll(
          'mwc-list-item, mwc-check-list-item, mwc-radio-list-item'
        )
      ).filter(item => item.getAttribute('sectionheader') !== null)
    );

    const items = <ListItemBase[]>(
      Array.from(
        this.querySelectorAll(
          'mwc-list-item,mwc-check-list-item,mwc-radio-list-item,li'
        )
      )
    );

    this.filterItems.forEach(item => {
      const value = item.value;
      const noniact = noniacts.find(
        noniact => noniact.querySelector('span')?.innerText === value
      );

      if (!noniact) return;
      const noniactindex = noniacts.indexOf(noniact);
      const index = items.indexOf(
        items.find(item => item.querySelector('span')?.innerText === value)!
      );

      const nextnoniactindex = noniacts[noniactindex + 1]
        ? items.indexOf(
            items.find(
              item =>
                item.querySelector('span')?.innerText ===
                noniacts[noniactindex + 1].querySelector('span')?.innerText
            )!
          )
        : items.length + 1;

      items
        .filter((v, i, a) => i >= index && i < nextnoniactindex)
        .forEach(item => item.classList.remove('filter'));
    });
  }

  private createFilterMenu(): void {
    this.filterMenu.open = true;
  }

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

  protected updated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    if (this.filterMenu)
      this.filterMenu.anchor = <HTMLElement>this.filterButton;
  }

  constructor() {
    super();
    this.addEventListener('selected', () => {
      this.requestUpdate();
    });
  }

  private renderFilterNoninteractives(): TemplateResult {
    return this.filterNoninteractives
      ? html`<mwc-icon-button
            icon="filter_list"
            @click=${() => this.createFilterMenu()}
          ></mwc-icon-button
          ><mwc-menu
            corner="BOTTOM_LEFT"
            menuCorner="END"
            @closed=${async () => {
              await this.requestUpdate();
              this.filterItem();
            }}
          >
            ${Array.from(this.querySelectorAll('mwc-list-item'))
              .filter(item => item.getAttribute('sectionheader') !== null)
              .map(item => {
                const text = item.querySelector('span')?.innerText;

                if (text)
                  return html`<mwc-check-list-item value="${text}"
                    ><span>${text}</span></mwc-check-list-item
                  >`;
              })}</mwc-menu
          >`
      : html``;
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
        ${this.renderFilterNoninteractives()}
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
      align-items: center;
    }

    ::slotted(.hidden) {
      display: none;
    }

    ::slotted(.filter) {
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

    mwc-icon-button {
      margin: 2px;
    }

    .mdc-list {
      padding-inline-start: 0px;
    }
  `;
}
