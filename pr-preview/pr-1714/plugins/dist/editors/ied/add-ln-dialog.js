import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, LitElement, property, query, state, } from '../../../../_snowpack/pkg/lit-element.js';
import { translate } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../../_snowpack/pkg/@material/mwc-textfield.js';
import '../../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../../_snowpack/pkg/@material/mwc-select.js';
import '../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../components/tooltip.js';
import { getLNodeTypes } from './foundation.js';
/** Dialog for adding a new LN to a LDevice. */
let AddLnDialog = class AddLnDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.lnType = '';
        this.amount = 1;
        this.filterText = '';
        this.prefix = '';
    }
    get lNodeTypes() {
        if (!this.doc)
            return [];
        return getLNodeTypes(this.doc).map(lnType => ({
            id: lnType.getAttribute('id') || '',
            lnClass: lnType.getAttribute('lnClass') || '',
            desc: lnType.getAttribute('desc') || undefined,
        }));
    }
    get filteredLNodeTypes() {
        const filter = this.filterText.trim().toLowerCase();
        if (!filter)
            return this.lNodeTypes;
        return this.lNodeTypes.filter(t => t.lnClass.toLowerCase().includes(filter) ||
            t.id.toLowerCase().includes(filter) ||
            (t.desc?.toLowerCase().includes(filter) ?? false));
    }
    show() {
        this.lnType = '';
        this.amount = 1;
        this.filterText = '';
        this.prefix = '';
        this.dialog.show();
    }
    close() {
        this.dialog.close();
    }
    isPrefixValid(prefix) {
        if (prefix === '')
            return true;
        if (prefix.length > 8)
            return false;
        return /^[A-Za-z][0-9A-Za-z_]*$/.test(prefix);
    }
    handleCreate() {
        const selectedType = this.lNodeTypes.find(t => t.id === this.lnType);
        if (!selectedType)
            return;
        const data = {
            lnType: selectedType.id,
            lnClass: selectedType.lnClass,
            amount: this.amount,
            ...(this.prefix && { prefix: this.prefix }),
        };
        this.onConfirm(data);
        this.close();
    }
    onListItemEnter(e, id) {
        const target = e.currentTarget;
        const idSpan = target.querySelector('[data-ln-id]');
        const isOverflowing = idSpan.scrollWidth > idSpan.clientWidth;
        if (!isOverflowing || !this.tooltip)
            return;
        this.tooltip.show(id, e.clientX, e.clientY);
    }
    onListItemMove(e) {
        if (!this.tooltip || !this.tooltip.visible)
            return;
        this.tooltip.updatePosition(e.clientX, e.clientY);
    }
    onListItemLeave() {
        if (this.tooltip) {
            this.tooltip.hide();
        }
    }
    render() {
        return html `
      <mwc-dialog
        id="addLnDialog"
        heading=${translate('iededitor.addLnDialog.title')}
        @closed=${this.close}
      >
        <div class="dialog-content">
          <div class="ln-list-container">
            <mwc-textfield
              label="${translate('iededitor.addLnDialog.filter')}"
              icon="search"
              type="text"
              .value=${this.filterText}
              @input=${(e) => {
            e.stopPropagation();
            this.filterText = e.target.value;
        }}
              style="margin-bottom: 8px; width: 100%;"
            ></mwc-textfield>
            <div class="ln-list-scroll">
              <mwc-list
                style="width: 100%;"
                @click=${(e) => e.stopPropagation()}
              >
                ${this.filteredLNodeTypes.length === 0
            ? html `<mwc-list-item disabled
                      >${translate('iededitor.addLnDialog.noResults')}</mwc-list-item
                    >`
            : this.filteredLNodeTypes.map(t => html `
                        <mwc-list-item
                          .selected=${this.lnType === t.id}
                          type="button"
                          @click=${(e) => {
                e.stopPropagation();
                this.lnType = t.id;
            }}
                          value=${t.id}
                          dialogAction="none"
                          style="cursor: pointer;"
                          @mouseenter=${(e) => this.onListItemEnter(e, t.id)}
                          @mousemove=${(e) => this.onListItemMove(e)}
                          @mouseleave=${() => this.onListItemLeave()}
                        >
                          <span class="ln-list-id" data-ln-id>${t.id}</span>
                          <span class="ln-list-desc">${t.desc || ''}</span>
                        </mwc-list-item>
                      `)}
              </mwc-list>
            </div>
          </div>
          <mwc-textfield
            label="${translate('iededitor.addLnDialog.prefix')}"
            type="text"
            maxlength="8"
            .value=${this.prefix}
            @input=${(e) => {
            e.stopPropagation();
            this.prefix = e.target.value;
        }}
            pattern="[A-Za-z][0-9A-Za-z_]*"
            style="width: 100%; margin-top: 12px;"
            data-testid="prefix"
          ></mwc-textfield>
          <mwc-textfield
            label=${translate('iededitor.addLnDialog.amount')}
            type="number"
            min="1"
            data-testid="amount"
            .value=${this.amount}
            @input=${(e) => {
            e.stopPropagation();
            this.amount = Number(e.target.value);
        }}
            @click=${(e) => e.stopPropagation()}
            @mousedown=${(e) => e.stopPropagation()}
            @mouseup=${(e) => e.stopPropagation()}
            style="width: 100%; margin-top: 12px;"
          ></mwc-textfield>
        </div>
        <mwc-button
          slot="secondaryAction"
          @click=${this.close}
          style="--mdc-theme-primary: var(--mdc-theme-error)"
        >
          ${translate('close')}
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          icon="add"
          trailingIcon
          data-testid="add-ln-button"
          @click=${this.handleCreate}
          ?disabled=${!this.lnType ||
            this.amount < 1 ||
            this.amount % 1 != 0 ||
            !this.isPrefixValid(this.prefix)}
        >
          ${translate('add')}
        </mwc-button>
        <oscd-tooltip-4c6027dd role="tooltip"></oscd-tooltip-4c6027dd>
      </mwc-dialog>
    `;
    }
};
AddLnDialog.styles = css `
    .dialog-content {
      margin-top: 16px;
      width: 400px;
      max-width: 100vw;
      box-sizing: border-box;
    }

    .ln-list-scroll {
      width: 100%;
      height: 240px;
      overflow-y: auto;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: var(--mdc-theme-surface, #fff);
    }

    mwc-list-item {
      --mdc-list-item-graphic-size: 0;
      min-height: 56px;
      height: 56px;
      max-height: 56px;
      padding-top: 0;
      padding-bottom: 0;
    }

    mwc-list-item[selected] {
      background: var(--mdc-theme-primary, #6200ee);
    }

    mwc-list-item[selected] .ln-list-id,
    mwc-list-item[selected] .ln-list-desc {
      color: var(--mdc-theme-on-primary, #fff);
    }

    mwc-list-item > span.ln-list-id,
    mwc-list-item > span.ln-list-desc {
      display: block;
      width: 100%;
    }

    .ln-list-id {
      font-size: 1em;
      line-height: 1.2;
      color: var(--mdc-theme-on-surface, #222);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ln-list-desc {
      font-size: 0.95em;
      color: var(--mdc-theme-text-secondary-on-background, #666);
      line-height: 1.1;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
__decorate([
    property({ attribute: false })
], AddLnDialog.prototype, "doc", void 0);
__decorate([
    property({ type: Function })
], AddLnDialog.prototype, "onConfirm", void 0);
__decorate([
    query('#addLnDialog')
], AddLnDialog.prototype, "dialog", void 0);
__decorate([
    query('oscd-tooltip-4c6027dd')
], AddLnDialog.prototype, "tooltip", void 0);
__decorate([
    state()
], AddLnDialog.prototype, "lnType", void 0);
__decorate([
    state()
], AddLnDialog.prototype, "amount", void 0);
__decorate([
    state()
], AddLnDialog.prototype, "filterText", void 0);
__decorate([
    state()
], AddLnDialog.prototype, "prefix", void 0);
AddLnDialog = __decorate([
    customElement('add-ln-dialog')
], AddLnDialog);
export { AddLnDialog };
//# sourceMappingURL=add-ln-dialog.js.map