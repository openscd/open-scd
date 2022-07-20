import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-dialog';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import { Dialog } from '@material/mwc-dialog';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { List } from '@material/mwc-list';

import {
  compareNames,
  getNameAttribute,
  identity,
  newPendingStateEvent,
  selector,
} from '../foundation.js';
import { renderDiff } from '../foundation/compare.js';

export default class CompareIEDPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ attribute: false })
  templateDoc: XMLDocument | undefined;

  @property({ attribute: false })
  selectedProjectIed: Element | undefined;

  @property({ attribute: false })
  selectedTemplateIed: Element | undefined;

  @query('mwc-dialog')
  dialog!: Dialog;

  @query('#template-file')
  private templateFileUI!: HTMLInputElement;

  get ieds(): Element[] {
    if (this.doc) {
      return Array.from(this.doc.querySelectorAll(`IED`)).sort(compareNames);
    }
    return [];
  }

  get templateIeds(): Element[] {
    if (this.templateDoc) {
      return Array.from(this.templateDoc.querySelectorAll(`IED`)).sort(
        compareNames
      );
    }
    return [];
  }

  async run(): Promise<void> {
    this.dialog.open = true;
  }

  private onClosed(): void {
    this.templateDoc = undefined;
    this.selectedProjectIed = undefined;
    this.selectedTemplateIed = undefined;
  }

  private getSelectedListItem(
    doc: Document,
    listId: string
  ): Element | undefined {
    const selectListItem = <ListItemBase>(
      (<List>this.shadowRoot!.querySelector(`mwc-list[id='${listId}']`)!)
        .selected
    );
    const identity = selectListItem?.value;
    if (identity) {
      return doc.querySelector(selector('IED', identity)) ?? undefined;
    }
    return undefined;
  }

  private async getTemplateFile(evt: Event): Promise<void> {
    const file = (<HTMLInputElement | null>evt.target)?.files?.item(0) ?? false;
    if (!file) return;

    const templateText = await file.text();
    this.templateDoc = new DOMParser().parseFromString(
      templateText,
      'application/xml'
    );
    this.templateFileUI.onchange = null;
  }

  private renderSelectIedButton(): TemplateResult {
    return html`<mwc-button
      slot="primaryAction"
      icon="arrow_back"
      trailingIcon
      label="${translate('compare-ied.selectIedButton')}"
      @click=${() => {
        this.selectedProjectIed = undefined;
        this.selectedTemplateIed = undefined;
      }}
    ></mwc-button>`;
  }

  private renderCompareButton(): TemplateResult {
    return html`<mwc-button
      slot="primaryAction"
      icon="compare_arrows"
      trailingIcon
      label="${translate('compare.compareButton')}"
      @click=${() => {
        this.selectedProjectIed = this.getSelectedListItem(
          this.doc,
          'currentDocument'
        );
        this.selectedTemplateIed = this.getSelectedListItem(
          this.templateDoc!,
          'currentTemplate'
        );
      }}
    ></mwc-button>`;
  }

  protected renderCloseButton(): TemplateResult {
    return html`<mwc-button
      slot="secondaryAction"
      dialogAction="close"
      label="${translate('close')}"
      style="--mdc-theme-primary: var(--mdc-theme-error)"
    ></mwc-button>`;
  }

  protected renderCompare(): TemplateResult {
    return html`${renderDiff(
      this.selectedTemplateIed!,
      this.selectedProjectIed!
    ) ??
    html`${translate('compare-ied.noDiff', {
      projectIedName: identity(this.selectedProjectIed!),
      templateIedName: identity(this.selectedTemplateIed!),
    })}`}
    ${this.renderSelectIedButton()} ${this.renderCloseButton()}`;
  }

  private renderIEDList(ieds: Element[], id: string): TemplateResult {
    return html`<mwc-list id="${id}" activatable>
      ${ieds.map(ied => {
        const name = getNameAttribute(ied);
        return html`<mwc-list-item value="${identity(ied)}" left>
          <span>${name}</span>
        </mwc-list-item>`;
      })}
    </mwc-list>`;
  }

  protected renderIEDLists(): TemplateResult {
    return html`<div class="splitContainer">
        <div>
          <div>${translate('compare-ied.projectIedTitle')}</div>
          <div class="iedList">
            ${this.renderIEDList(this.ieds, 'currentDocument')}
          </div>
        </div>
        <div>
          <div>${translate('compare-ied.templateIedTitle')}</div>
          <div class="iedList">
            ${this.renderIEDList(this.templateIeds, 'currentTemplate')}
          </div>
        </div>
      </div>
      ${this.renderCompareButton()} ${this.renderCloseButton()}`;
  }

  protected renderSelectTemplateFile(): TemplateResult {
    return html`<div>
        <input
          id="template-file"
          accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
          type="file"
          hidden
          required
          @change=${(evt: Event) =>
            this.dispatchEvent(newPendingStateEvent(this.getTemplateFile(evt)))}
        />

        <mwc-button
          label="${translate('compare-ied.selectTemplateButton')}"
          @click=${() => {
            const input = <HTMLInputElement | null>(
              this.shadowRoot!.querySelector('#template-file')
            );
            input?.click();
          }}
        ></mwc-button>
      </div>
      ${this.renderCloseButton()}`;
  }

  private renderDialog(content: TemplateResult): TemplateResult {
    return html`<mwc-dialog
      heading="${translate('compare-ied.title')}"
      @closed=${this.onClosed}
    >
      ${content}
    </mwc-dialog>`;
  }

  render(): TemplateResult {
    if (!this.doc) return html``;

    if (this.selectedProjectIed && this.selectedTemplateIed) {
      return this.renderDialog(this.renderCompare());
    } else if (this.templateDoc) {
      return this.renderDialog(this.renderIEDLists());
    } else {
      return this.renderDialog(this.renderSelectTemplateFile());
    }
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-max-width: 92vw;
    }

    .splitContainer {
      display: flex;
      padding: 8px 6px 16px;
      height: 64vh;
    }

    .iedList {
      flex: 50%;
      margin: 0px 6px 0px;
      min-width: 300px;
      height: 100%;
      overflow-y: auto;
    }
  `;
}
