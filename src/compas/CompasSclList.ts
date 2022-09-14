import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import {
  CompasSclDataService,
  SDS_NAMESPACE,
} from '../compas-services/CompasSclDataService.js';

/* Event that will be used when a SCL is selected from a list of SCL Documents. */
export interface SclSelectedDetail {
  docId: string;
}
export type SclSelectedEvent = CustomEvent<SclSelectedDetail>;
export function newSclSelectedEvent(docId: string): SclSelectedEvent {
  return new CustomEvent<SclSelectedDetail>('sclSelected', {
    bubbles: true,
    composed: true,
    detail: { docId },
  });
}

@customElement('compas-scl-list')
export class CompasSclList extends LitElement {
  @property({ type: String })
  type = '';

  @property()
  scls!: Element[];

  firstUpdated(): void {
    this.fetchData();
  }

  fetchData(): void {
    CompasSclDataService()
      .listScls(this.type)
      .then(xmlResponse => {
        this.scls = Array.from(xmlResponse.querySelectorAll('Item') ?? []);
      });
  }

  render(): TemplateResult {
    if (!this.scls) {
      return html` <compas-loading></compas-loading> `;
    }
    if (this.scls?.length <= 0) {
      return html` <mwc-list>
        <mwc-list-item><i>${translate('compas.noScls')}</i></mwc-list-item>
      </mwc-list>`;
    }
    return html` <mwc-list>
      ${this.scls.map(item => {
        const id =
          item.getElementsByTagNameNS(SDS_NAMESPACE, 'Id').item(0)!
            .textContent ?? '';
        let name =
          item.getElementsByTagNameNS(SDS_NAMESPACE, 'Name').item(0)!
            .textContent ?? '';
        if (name === '') {
          name = id;
        }
        const version =
          item.getElementsByTagNameNS(SDS_NAMESPACE, 'Version').item(0)!
            .textContent ?? '';
        return html`<mwc-list-item
          tabindex="0"
          @click=${() => this.dispatchEvent(newSclSelectedEvent(id))}
        >
          ${name} (${version})
        </mwc-list-item>`;
      })}
    </mwc-list>`;
  }
}
