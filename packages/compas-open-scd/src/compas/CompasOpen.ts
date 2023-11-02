import {
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-button';

import { newPendingStateEvent } from '../foundation.js';

import { CompasSclDataService } from '../compas-services/CompasSclDataService.js';
import { createLogEvent } from '../compas-services/foundation.js';
import { SclSelectedEvent } from './CompasSclList.js';
import { TypeSelectedEvent } from './CompasSclTypeList.js';

import '../WizardDivider.js';
import './CompasSclTypeList.js';
import './CompasSclList.js';

import { nothing } from 'lit-html';
import { buildDocName } from './foundation.js';

/* Event that will be used when an SCL Document is retrieved. */
export interface DocRetrievedDetail {
  localFile: boolean;
  doc: Document;
  docName?: string;
  docId?: string;
}
export type DocRetrievedEvent = CustomEvent<DocRetrievedDetail>;
export function newDocRetrievedEvent(
  localFile: boolean,
  doc: Document,
  docName?: string,
  docId?: string
): DocRetrievedEvent {
  return new CustomEvent<DocRetrievedDetail>('doc-retrieved', {
    bubbles: true,
    composed: true,
    detail: { localFile, doc, docName, docId },
  });
}

@customElement('compas-open')
export default class CompasOpenElement extends LitElement {
  @property()
  selectedType: string | undefined;
  @property()
  allowLocalFile = true;

  @query('#scl-file')
  private sclFileUI!: HTMLInputElement;

  private async getSclDocument(docId?: string): Promise<void> {
    const doc = await CompasSclDataService()
      .getSclDocument(this, this.selectedType ?? '', docId ?? '')
      .catch(reason => createLogEvent(this, reason));

    if (doc instanceof Document) {
      const docName = buildDocName(doc.documentElement);
      this.dispatchEvent(newDocRetrievedEvent(false, doc, docName, docId));
    }
  }

  private async getSclFile(evt: Event): Promise<void> {
    const file = (<HTMLInputElement | null>evt.target)?.files?.item(0) ?? false;
    if (!file) return;

    const text = await file.text();
    const docName = file.name;
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    this.dispatchEvent(newDocRetrievedEvent(true, doc, docName));
  }

  private renderFileSelect(): TemplateResult {
    return html`
      <input
        id="scl-file"
        accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
        type="file"
        hidden
        required
        @change=${(evt: Event) =>
          this.dispatchEvent(newPendingStateEvent(this.getSclFile(evt)))}
      />

      <mwc-button
        label="${translate('compas.open.selectFileButton')}"
        @click=${() => {
          this.sclFileUI.value = '';
          this.sclFileUI.click();
        }}
      >
      </mwc-button>
    `;
  }

  private renderSclTypeList(): TemplateResult {
    return html`
      <p>${translate('compas.open.listSclTypes')}</p>
      <compas-scltype-list
        @typeSelected=${(evt: TypeSelectedEvent) =>
          (this.selectedType = evt.detail.type)}
      />
    `;
  }

  private renderSclList(): TemplateResult {
    return html`
      <p>${translate('compas.open.listScls', {
        type: this.selectedType ?? '',
      })}</p>
      <compas-scl-list .type=${this.selectedType}
                       @scl-selected=${(evt: SclSelectedEvent) =>
                         this.dispatchEvent(
                           newPendingStateEvent(
                             this.getSclDocument(evt.detail.docId)
                           )
                         )}/>
      </compas-scl-list>
      <mwc-button id="reselect-type"
                  label="${translate('compas.open.otherTypeButton')}"
                  icon="arrow_back"
                  @click=${() => {
                    this.selectedType = undefined;
                  }}>
      </mwc-button>
    `;
  }

  render(): TemplateResult {
    return html`
      ${this.allowLocalFile
        ? html`<wizard-divider></wizard-divider>
            <section>
              <h3>${translate('compas.open.localTitle')}</h3>
              ${this.renderFileSelect()}
            </section>`
        : nothing}
      <wizard-divider></wizard-divider>
      <section>
        <h3>${translate('compas.open.compasTitle')}</h3>
        ${this.selectedType ? this.renderSclList() : this.renderSclTypeList()}
      </section>
    `;
  }
}
