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

/* Event that will be used when a SCL Document is retrieved. */
export interface DocRetrievedDetail {
  localFile: boolean;
  doc: Document;
  docName?: string;
}
export type DocRetrievedEvent = CustomEvent<DocRetrievedDetail>;
export function newDocRetrievedEvent(
  localFile: boolean,
  doc: Document,
  docName?: string
): DocRetrievedEvent {
  return new CustomEvent<DocRetrievedDetail>('docRetrieved', {
    bubbles: true,
    composed: true,
    detail: { localFile, doc, docName },
  });
}

@customElement('compas-open')
export default class CompasOpenElement extends LitElement {
  @property()
  selectedType: string | undefined;

  @query('#scl-file')
  private sclFileUI!: HTMLInputElement;

  private async getSclDocument(id?: string): Promise<void> {
    const sclDocument = await CompasSclDataService()
      .getSclDocument(this.selectedType ?? '', id ?? '')
      .catch(reason => createLogEvent(this, reason));
    if (sclDocument instanceof Document) {
      this.dispatchEvent(newDocRetrievedEvent(false, sclDocument));
    }
  }

  private async getSclFile(evt: Event): Promise<void> {
    const file = (<HTMLInputElement | null>evt.target)?.files?.item(0) ?? false;
    if (!file) return;

    const text = await file.text();
    const docName = file.name;
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    this.dispatchEvent(newDocRetrievedEvent(true, doc, docName));
    this.sclFileUI.onchange = null;
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
          const input = <HTMLInputElement | null>(
            this.shadowRoot!.querySelector('#scl-file')
          );
          input?.click();
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
                       @sclSelected=${(evt: SclSelectedEvent) =>
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
      <wizard-divider></wizard-divider>
      <section>
        <h3>${translate('compas.open.localTitle')}</h3>
        ${this.renderFileSelect()}
      </section>
      <wizard-divider></wizard-divider>
      <section>
        <h3>${translate('compas.open.compasTitle')}</h3>
        ${this.selectedType ? this.renderSclList() : this.renderSclTypeList()}
      </section>
    `;
  }
}
