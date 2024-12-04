var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  css,
  customElement,
  html,
  property,
  query,
  state,
  unsafeCSS
} from "../../_snowpack/pkg/lit-element.js";
import {get} from "../../_snowpack/pkg/lit-translate.js";
import "../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../_snowpack/pkg/@material/mwc-textfield.js";
import {CheckListItem} from "../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import {List} from "../../_snowpack/pkg/@material/mwc-list.js";
import {ListBase} from "../../_snowpack/pkg/@material/mwc-list/mwc-list-base.js";
function slotItem(item) {
  if (!item.closest("filtered-list") || !item.parentElement)
    return item;
  if (item.parentElement instanceof FilteredList)
    return item;
  return slotItem(item.parentElement);
}
function hideFiltered(item, searchText) {
  const itemInnerText = item.innerText + "\n";
  const childInnerText = Array.from(item.children).map((child) => child.innerText).join("\n");
  const value = item.value;
  const filterTarget = (itemInnerText + childInnerText + value).toUpperCase();
  const terms = searchText.toUpperCase().replace(/[.+^${}()|[\]\\]/g, "\\$&").trim().split(/\s+/g);
  terms.length === 1 && terms[0] === "" || terms.every((term) => {
    const reTerm = new RegExp(`*${term}*`.replace(/\*/g, ".*").replace(/\?/g, ".{1}"), "i");
    return reTerm.test(filterTarget);
  }) ? slotItem(item).classList.remove("hidden") : slotItem(item).classList.add("hidden");
}
export let FilteredList = class extends ListBase {
  constructor() {
    super();
    this.disableCheckAll = false;
    this.addEventListener("selected", () => {
      this.requestUpdate();
    });
  }
  get existCheckListItem() {
    return this.items.some((item) => item instanceof CheckListItem);
  }
  get isAllSelected() {
    return this.items.filter((item) => !item.disabled).filter((item) => item instanceof CheckListItem).every((checkItem) => checkItem.selected);
  }
  get isSomeSelected() {
    return this.items.filter((item) => !item.disabled).filter((item) => item instanceof CheckListItem).some((checkItem) => checkItem.selected);
  }
  onCheckAll() {
    const select = !this.isAllSelected;
    this.items.filter((item) => !item.disabled && !item.classList.contains("hidden")).forEach((item) => item.selected = select);
  }
  onFilterInput() {
    Array.from(this.querySelectorAll("mwc-list-item, mwc-check-list-item, mwc-radio-list-item")).forEach((item) => hideFiltered(item, this.searchField.value));
  }
  onListItemConnected(e) {
    super.onListItemConnected(e);
    this.requestUpdate();
  }
  update(changedProperties) {
    super.update(changedProperties);
    this.onFilterInput();
  }
  renderCheckAll() {
    return this.existCheckListItem && !this.disableCheckAll ? html`<mwc-formfield class="checkall"
          ><mwc-checkbox
            ?indeterminate=${!this.isAllSelected && this.isSomeSelected}
            ?checked=${this.isAllSelected}
            @change=${() => {
      this.onCheckAll();
    }}
          ></mwc-checkbox
        ></mwc-formfield>` : html``;
  }
  render() {
    return html`<div id="tfcontainer">
        <abbr title="${this.searchFieldLabel ?? get("filter")}"
          ><mwc-textfield
            label="${this.searchFieldLabel ?? ""}"
            iconTrailing="search"
            outlined
            @input=${() => this.onFilterInput()}
          ></mwc-textfield
        ></abbr>
        ${this.renderCheckAll()}
      </div>
      ${super.render()}`;
  }
};
FilteredList.styles = css`
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
__decorate([
  property({type: String})
], FilteredList.prototype, "searchFieldLabel", 2);
__decorate([
  property({type: Boolean})
], FilteredList.prototype, "disableCheckAll", 2);
__decorate([
  state()
], FilteredList.prototype, "existCheckListItem", 1);
__decorate([
  state()
], FilteredList.prototype, "isAllSelected", 1);
__decorate([
  state()
], FilteredList.prototype, "isSomeSelected", 1);
__decorate([
  query("mwc-textfield")
], FilteredList.prototype, "searchField", 2);
FilteredList = __decorate([
  customElement("filtered-list")
], FilteredList);
