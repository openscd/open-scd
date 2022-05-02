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
import { compareNames, getNameAttribute } from '../../foundation.js';
import { newIEDSelectEvent, styles } from './foundation.js';

let selectedIed: Element | undefined;

function onOpenDocResetSelectedGooseMsg() {
  selectedIed = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedGooseMsg);

@customElement('goose-subscriber-list')
export class GooseSubscriberList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  private get ieds(): Element[] {
    return this.doc
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a, b) =>
          compareNames(a, b)
        )
      : [];
  }

  private onIedSelect(element: Element): void {
    selectedIed = element;

    this.dispatchEvent(
      newIEDSelectEvent(
        selectedIed
      )
    );
  }

  protected firstUpdated(): void {
    this.dispatchEvent(
      newIEDSelectEvent(
        selectedIed
      )
    );
  }

  render(): TemplateResult {
    return html` <section tabindex="0">
      <h1>${translate('subscription.subscriberGoose.title')}</h1>
      <filtered-list>
        ${this.ieds.map(
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
