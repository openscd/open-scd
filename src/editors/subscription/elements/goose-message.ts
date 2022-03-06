import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-icon';
import '@material/mwc-list/mwc-list-item';

import { gooseIcon } from '../../../icons.js';
import { newGOOSESelectEvent } from '../foundation.js';

@customElement('goose-message')
export class GOOSEMessage extends LitElement {
  /** Holding the GSEControl element */
  @property({ attribute: false })
  element!: Element;

  private onGooseSelect = () => {
    const ln = this.element.parentElement;
    const dataset = ln?.querySelector(
      `DataSet[name=${this.element.getAttribute('datSet')}]`
    );
    this.dispatchEvent(newGOOSESelectEvent(this.element, dataset!));
  };

  render(): TemplateResult {
    return html`<mwc-list-item @click=${this.onGooseSelect} graphic="large">
      <span>${this.element.getAttribute('name')}</span>
      <mwc-icon slot="graphic">${gooseIcon}</mwc-icon>
    </mwc-list-item>`;
  }
}
