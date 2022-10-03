import { customElement, html, LitElement, TemplateResult, property } from 'lit-element';

import '../../action-pane.js';
import { generalConductingEquipmentIcon } from '../../icons/icons.js';

@customElement('general-equipment-editor')
export class GeneralEquipmentEditor extends LitElement {

  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;
  /** Whether `Function` and `SubFunction` are rendered */
  @property({ type: Boolean })
  showfunctions = false;
  @property({ type: String })
  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc');
    if (this.showfunctions)
      return `${name} ${desc ? `— ${desc}` : ''}`;
    return `${name}`;
  }

  render(): TemplateResult {
    if (this.showfunctions)
      return html`<action-pane label=${this.header}></action-pane>`;
    return html`<action-icon label=${this.header}>
    <mwc-icon slot="icon">${generalConductingEquipmentIcon}
      </mwc-icon> </action-icon>`;
  }
}
