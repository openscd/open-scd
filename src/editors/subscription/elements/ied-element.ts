import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-icon';
import '@material/mwc-list/mwc-list-item';

import { newIEDSubscriptionEvent, SubscribeStatus } from '../foundation.js';

@customElement('ied-element')
export class IEDElement extends LitElement {
  /** Holding the IED element */
  @property({ attribute: false })
  element!: Element;

  @property({ attribute: false })
  status!: SubscribeStatus;

  private onIedSelect = () => {
    this.dispatchEvent(
      newIEDSubscriptionEvent(
        this.element,
        this.status ?? SubscribeStatus.None
      )
    );
  };

  render(): TemplateResult {
    return html`<mwc-list-item
      @click=${this.onIedSelect}
      graphic="avatar"
      hasMeta>
      <span>${this.element.getAttribute('name')}</span>
      <mwc-icon slot="graphic">${this.status == SubscribeStatus.Full ? html`clear` : html`add`}</mwc-icon>
    </mwc-list-item>`;
  }

  static styles = css``;
}
