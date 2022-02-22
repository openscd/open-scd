import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { newGOOSEDataSetEvent } from '../../../foundation.js';

@customElement('goose-message')
export class GOOSEMessage extends LitElement {
  /** Holding the GSEControl element */
  @property({ attribute: false })
  element!: Element;

  private onGooseSelect = () => {
    const ln = this.element.parentElement;
    const dataset = ln?.querySelector(`DataSet[name=${this.element.getAttribute('datSet')}]`);
    document.querySelector('open-scd')!.dispatchEvent(
      newGOOSEDataSetEvent(
        this.element.closest('IED')?.getAttribute('name') ?? '',
        this.element.getAttribute('name') ?? '',
        dataset!
      )
    );
  };

  render(): TemplateResult {
    return html`<mwc-list-item
      @click=${this.onGooseSelect}
      graphic="icon"
      tabindex="0">
      <span>${this.element.getAttribute('name')}</span>
    </mwc-list-item>`;
  }

  static styles = css``;
}
