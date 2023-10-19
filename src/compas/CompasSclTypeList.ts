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

/* Event that will be used when a SCL Type is selected from a list of types. */
export interface TypeSelectedDetail {
  type: string;
}
export type TypeSelectedEvent = CustomEvent<TypeSelectedDetail>;
export function newTypeSelectedEvent(type: string): TypeSelectedEvent {
  return new CustomEvent<TypeSelectedDetail>('typeSelected', {
    bubbles: true,
    composed: true,
    detail: { type },
  });
}

@customElement('compas-scltype-list')
export class CompasSclTypeList extends LitElement {
  @property()
  sclTypes!: Element[];

  firstUpdated(): void {
    this.fetchData();
  }

  fetchData(): void {
    CompasSclDataService()
      .listOrderedSclTypes()
      .then(types => (this.sclTypes = types));
  }

  render(): TemplateResult {
    if (!this.sclTypes) {
      return html` <compas-loading></compas-loading> `;
    }

    if (this.sclTypes.length <= 0) {
      return html` <mwc-list>
        <mwc-list-item><i>${translate('compas.noSclTypes')}</i></mwc-list-item>
      </mwc-list>`;
    }

    return html` <mwc-list>
      ${this.sclTypes.map(type => {
        const code =
          type.getElementsByTagNameNS(SDS_NAMESPACE, 'Code').item(0)!
            .textContent ?? '';
        const description =
          type.getElementsByTagNameNS(SDS_NAMESPACE, 'Description').item(0)!
            .textContent ?? '';
        return html`<mwc-list-item
          tabindex="0"
          @click=${() => this.dispatchEvent(newTypeSelectedEvent(code))}
        >
          <span>${description} (${code})</span>
        </mwc-list-item>`;
      })}
    </mwc-list>`;
  }
}
