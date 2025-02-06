import { __decorate } from "../../_snowpack/pkg/tslib.js";
import { css, customElement, html, property, query, unsafeCSS, } from '../../_snowpack/pkg/lit-element.js';
import { get } from '../../_snowpack/pkg/lit-translate.js';
import '../../_snowpack/pkg/@material/mwc-icon-button.js';
import '../../_snowpack/pkg/@material/mwc-dialog.js';
import './filtered-list.js';
import { FilteredList } from './filtered-list.js';
/**
 * A mwc-list with mwc-textfield that filters the list items for given or separated terms
 */
let FilterButton = class FilterButton extends FilteredList {
    constructor() {
        super(...arguments);
        this.disabled = false;
    }
    toggleList() {
        this.filterDialog.show();
    }
    onClosing() {
        const selectedItems = [];
        if (this.selected) {
            if (this.selected instanceof Array) {
                this.selected.forEach(item => selectedItems.push(item.value));
            }
            else {
                selectedItems.push(this.selected.value);
            }
            this.dispatchEvent(newSelectedItemsChangedEvent(selectedItems));
        }
    }
    render() {
        return html `
      <mwc-icon-button
        icon="${this.icon}"
        @click="${this.toggleList}"
        ?disabled="${this.disabled}"
      >
        <slot name="icon"></slot>
      </mwc-icon-button>
      <mwc-dialog
        id="filterDialog"
        heading="${this.header ? this.header : get('filter')}"
        scrimClickAction=""
        @closing="${() => this.onClosing()}"
      >
        ${super.render()}
        <mwc-button slot="primaryAction" dialogAction="close">
          ${get('close')}
        </mwc-button>
      </mwc-dialog>
    `;
    }
};
FilterButton.styles = css `
    ${unsafeCSS(FilteredList.styles)}

    mwc-icon-button {
      color: var(--mdc-theme-on-surface);
    }

    mwc-dialog {
      --mdc-dialog-max-height: calc(100vh - 150px);
    }
  `;
__decorate([
    property()
], FilterButton.prototype, "header", void 0);
__decorate([
    property()
], FilterButton.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], FilterButton.prototype, "disabled", void 0);
__decorate([
    query('#filterDialog')
], FilterButton.prototype, "filterDialog", void 0);
FilterButton = __decorate([
    customElement('oscd-filter-button')
], FilterButton);
export { FilterButton };
function newSelectedItemsChangedEvent(selectedItems, eventInitDict) {
    return new CustomEvent('selected-items-changed', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { selectedItems, ...eventInitDict?.detail },
    });
}
//# sourceMappingURL=oscd-filter-button.js.map