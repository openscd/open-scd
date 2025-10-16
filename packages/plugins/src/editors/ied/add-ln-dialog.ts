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
import { translate } from 'lit-translate';

import { Dialog } from '@material/mwc-dialog';
import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

import { getLNodeTypes } from './foundation';

export interface LNData {
  lnType: string;
  lnClass: string;
  amount: number;
  prefix?: string;
}

/** Dialog for adding a new LN to a LDevice. */
@customElement('add-ln-dialog')
export class AddLnDialog extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Function })
  onConfirm!: (data: LNData) => void;

  @query('#addLnDialog')
  dialog!: Dialog;

  @state()
  lnType: string = '';

  @state()
  amount: number = 1;

  @state()
  filterText = '';

  @state()
  prefix: string = '';

  private get lNodeTypes(): Array<{
    id: string;
    lnClass: string;
    desc?: string;
  }> {
    if (!this.doc) return [];
    return getLNodeTypes(this.doc).map(lnType => ({
      id: lnType.getAttribute('id') || '',
      lnClass: lnType.getAttribute('lnClass') || '',
      desc: lnType.getAttribute('desc') || undefined,
    }));
  }

  private get filteredLNodeTypes() {
    const filter = this.filterText.trim().toLowerCase();
    if (!filter) return this.lNodeTypes;
    return this.lNodeTypes.filter(
      t =>
        t.lnClass.toLowerCase().includes(filter) ||
        t.id.toLowerCase().includes(filter) ||
        (t.desc?.toLowerCase().includes(filter) ?? false)
    );
  }

  public show(): void {
    this.lnType = '';
    this.amount = 1;
    this.filterText = '';
    this.prefix = '';
    this.dialog.show();
  }

  private close(): void {
    this.dialog.close();
  }

  private isPrefixValid(prefix: string): boolean {
    if (prefix === '') return true;
    if (prefix.length > 8) return false;
    return /^[A-Za-z][0-9A-Za-z_]*$/.test(prefix);
  }

  private handleCreate(): void {
    const selectedType = this.lNodeTypes.find(t => t.id === this.lnType);
    if (!selectedType) return;
    const data: LNData = {
      lnType: selectedType.id,
      lnClass: selectedType.lnClass,
      amount: this.amount,
      ...(this.prefix && { prefix: this.prefix }),
    };

    this.onConfirm(data);
    this.close();
  }

  render(): TemplateResult {
    return html`
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
              @input=${(e: Event) => {
                e.stopPropagation();
                this.filterText = (e.target as HTMLInputElement).value;
              }}
              style="margin-bottom: 8px; width: 100%;"
            ></mwc-textfield>
            <div class="ln-list-scroll">
              <mwc-list
                style="width: 100%;"
                @click=${(e: Event) => e.stopPropagation()}
              >
                ${this.filteredLNodeTypes.length === 0
                  ? html`<mwc-list-item disabled
                      >${translate(
                        'iededitor.addLnDialog.noResults'
                      )}</mwc-list-item
                    >`
                  : this.filteredLNodeTypes.map(
                      t => html`
                        <mwc-list-item
                          .selected=${this.lnType === t.id}
                          type="button"
                          @click=${(e: Event) => {
                            e.stopPropagation();
                            this.lnType = t.id;
                          }}
                          value=${t.id}
                          dialogAction="none"
                          style="cursor: pointer;"
                          title="${t.id}"
                        >
                          <span class="ln-list-id">${t.id}</span>
                          <span class="ln-list-desc">${t.desc || ''}</span>
                        </mwc-list-item>
                      `
                    )}
              </mwc-list>
            </div>
          </div>
          <mwc-textfield
            label="${translate('iededitor.addLnDialog.prefix')}"
            type="text"
            maxlength="8"
            .value=${this.prefix}
            @input=${(e: Event) => {
              e.stopPropagation();
              this.prefix = (e.target as HTMLInputElement).value;
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
            @input=${(e: Event) => {
              e.stopPropagation();
              this.amount = Number((e.target as HTMLInputElement).value);
            }}
            @click=${(e: Event) => e.stopPropagation()}
            @mousedown=${(e: Event) => e.stopPropagation()}
            @mouseup=${(e: Event) => e.stopPropagation()}
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
      </mwc-dialog>
    `;
  }

  static styles = css`
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
}
