import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list/mwc-list-item';

import '../../filtered-list.js';
import { getNameAttribute } from '../../foundation.js';
import { getOrderedIeds, newIEDSelectEvent, styles } from './foundation.js';

let selectedIed: Element | undefined;

function onOpenDocResetSelectedGooseMsg() {
  selectedIed = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedGooseMsg);

@customElement('ied-list')
export class IedList extends LitElement {
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @property({ type: String })
  serviceType?: 'goose' | 'smv';

  private onIedSelect(element: Element): void {
    selectedIed = element;

    this.dispatchEvent(newIEDSelectEvent(selectedIed));
  }

  protected updated(): void {
    this.dispatchEvent(newIEDSelectEvent(selectedIed));
  }

  protected firstUpdated(): void {
    selectedIed = undefined;
  }

  render(): TemplateResult {
    return html` <section tabindex="0">
      <h1>
        ${translate(`subscription.${this.serviceType}.subscriber.iedListTitle`)}
      </h1>
      <filtered-list activatable>
        ${getOrderedIeds(this.doc).map(
          ied =>
            html`
              <mwc-list-item
                @click=${() => this.onIedSelect(ied)}
                graphic="icon"
              >
                <span>${getNameAttribute(ied)}</span>
                <mwc-icon slot="graphic">developer_board</mwc-icon>
              </mwc-list-item>
            `
        )}
      </filtered-list>
    </section>`;
  }

  static styles = css`
    ${styles}
  `;
}
