import {
  css,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  state,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import { SelectedItemsChangedEvent } from '../oscd-filter-button.js';

import '../filtered-list.js';
import '../oscd-filter-button.js';

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
  return new CustomEvent<SclSelectedDetail>('scl-selected', {
    bubbles: true,
    composed: true,
    detail: { docId },
  });
}

@customElement('compas-scl-list')
export class CompasSclList extends LitElement {
  @property()
  type?: string;

  @state()
  private items?: Element[];

  @state()
  private labels: string[] = [];

  @state()
  private selectedLabels: string[] = [];

  @state()
  private get filteredItems(): Element[] | undefined {
    // If items are still being retrieved, return undefined.
    if (!this.items) {
      return undefined;
    }

    // If all labels are selected, show all items, including the ones not having a Label.
    if (this.labels.length === this.selectedLabels.length) {
      return this.items;
    }

    return this.items.filter(item => {
      const labels = Array.from(item.querySelectorAll('Label') ?? [])
        .map(element => element.textContent)
        .filter(value => !!value) as string[];
      return (
        labels.filter(label => this.selectedLabels.includes(label)).length > 0
      );
    });
  }

  firstUpdated(): void {
    this.fetchData();
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the document is updated, we reset the selected IED.
    if (_changedProperties.has('type')) {
      this.items = undefined;
      this.labels = [];
      this.selectedLabels = [];
      this.fetchData();
    }
  }

  fetchData(): void {
    if (this.type) {
      CompasSclDataService()
        .listScls(this.type)
        .then(xmlResponse => {
          this.items = Array.from(xmlResponse.querySelectorAll('Item') ?? []);
          this.labels = Array.from(
            new Set(
              Array.from(xmlResponse.querySelectorAll('Label') ?? [])
                .map(element => element.textContent)
                .filter(label => !!label)
                .sort((label1, label2) => label1!.localeCompare(label2!))
            )
          ) as string[];
          this.selectedLabels = this.labels;
        });
    }
  }

  render(): TemplateResult {
    if (!this.items) {
      return html` <compas-loading></compas-loading> `;
    }
    if (this.items?.length <= 0) {
      return html` <mwc-list>
        <mwc-list-item><i>${translate('compas.noScls')}</i></mwc-list-item>
      </mwc-list>`;
    }
    const filteredItems = this.filteredItems;
    return html`
      <div class="filters">
        <span>${translate('compas.sclFilter')}</span>
        <oscd-filter-button
          id="labelsFilter"
          multi="true"
          ?disabled="${this.labels.length <= 0}"
          .header=${translate('compas.label.selectLabels')}
          @selected-items-changed="${(e: SelectedItemsChangedEvent) => {
            this.selectedLabels = e.detail.selectedItems;
            this.requestUpdate('items');
            this.requestUpdate('filteredItems');
            this.requestUpdate('selectedLabels');
          }}"
        >
          <span slot="icon">
            <mwc-icon>
              ${this.labels.length != this.selectedLabels.length
                ? 'label'
                : 'label_off'}
            </mwc-icon>
          </span>
          ${this.labels.map(label => {
            return html` <mwc-check-list-item
              value="${label}"
              ?selected="${this.selectedLabels.includes(label)}"
            >
              ${label}
            </mwc-check-list-item>`;
          })}
        </oscd-filter-button>
      </div>
      ${filteredItems && filteredItems.length > 0
        ? html` <filtered-list>
            ${filteredItems.map(item => {
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
              return html` <mwc-list-item
                tabindex="0"
                @click=${() => this.dispatchEvent(newSclSelectedEvent(id))}
              >
                ${name} (${version})
              </mwc-list-item>`;
            })}
          </filtered-list>`
        : html` <mwc-list>
            <mwc-list-item>
              <i>${translate('compas.noFilteredScls')}</i>
            </mwc-list-item>
          </mwc-list>`}
    `;
  }

  static styles = css`
    .filters {
      padding-left: var(--mdc-list-side-padding, 16px);
      display: flex;
    }

    .filters > span {
      line-height: 48px;
    }
  `;
}
