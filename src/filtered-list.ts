import { List } from '@material/mwc-list';
import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { TextField } from '@material/mwc-textfield';
import {
  css,
  customElement,
  html,
  internalProperty,
  property,
  query,
  TemplateResult,
  unsafeCSS,
} from 'lit-element';

@customElement('filtered-list')
export class FilteredList extends List {
  @property({ type: String })
  searchFieldLabel!: string;

  @property({ type: Boolean })
  disableCheckAll = false;

  @internalProperty()
  private get existCheckListItem(): boolean {
    return this.items.some(item => item instanceof CheckListItem);
  }

  @internalProperty()
  private get isAllSelected(): boolean {
    return this.items
      .filter(item => !item.disabled)
      .filter(item => item instanceof CheckListItem)
      .every(checkItem => checkItem.selected);
  }

  @internalProperty()
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
    this.items.forEach(item => {
      const text: string = (
        item.innerText +
        '\n' +
        Array.from(item.children)
          .map(child => (<HTMLElement>child).innerText)
          .join('\n')
      ).toUpperCase();
      const terms: string[] = this.searchField.value.toUpperCase().split(' ');

      terms.some(term => !text.includes(term))
        ? item.classList.add('hidden')
        : item.classList.remove('hidden');
    });
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
        <mwc-textfield
          label="${this.searchFieldLabel ?? ''}"
          iconTrailing="search"
          outlined
          @input=${() => this.onFilterInput()}
        ></mwc-textfield>
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

    mwc-textfield {
      margin: 10px;
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
