import { customElement, html, LitElement, TemplateResult } from 'lit-element';

import '../../action-pane.js';

@customElement('general-equipment-editor')
export class GeneralEquipmentEditor extends LitElement {
  render(): TemplateResult {
    return html`<action-pane label="someLabel"></action-pane>`;
  }
}
