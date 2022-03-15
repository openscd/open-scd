import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-icon';
import '@material/mwc-list/mwc-list-item';

import { newSampledValuesSelectEvent } from '../foundation.js';
import { smvIcon } from '../../../icons/icons.js';

@customElement('sampled-values-message')
export class SampledValuesMessage extends LitElement {
  /** Holding the SampledValueControl element */
  @property({ attribute: false })
  element!: Element;

  private onSampledValuesSelect = () => {
    const ln = this.element.parentElement;
    const dataset = ln?.querySelector(
      `DataSet[name=${this.element.getAttribute('datSet')}]`
    );
    this.dispatchEvent(
      newSampledValuesSelectEvent(
        this.element,
        dataset!
      )
    );
  };

  render(): TemplateResult {
    return html`<mwc-list-item @click=${this.onSampledValuesSelect} graphic="large">
      <span>${this.element.getAttribute('name')}</span>
      <mwc-icon slot="graphic">${smvIcon}</mwc-icon>
    </mwc-list-item>`;
  }
}
