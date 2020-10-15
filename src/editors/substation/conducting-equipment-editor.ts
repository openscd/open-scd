import {
  customElement,
  LitElement,
  html,
  TemplateResult,
  property,
} from 'lit-element';
import { disconnectorIcon } from '../../icons.js';

@customElement('conducting-equipment-editor')
export class ConductingEquipmentEditor extends LitElement {
  @property({ type: Element })
  element!: Element;
  @property({ type: Element })
  parent!: Element;
  @property({ type: String })
  get name(): string {
    return this.element?.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string {
    return this.element?.getAttribute('desc') ?? '';
  }

  renderHeader(): TemplateResult {
    return html`<h1>${this.name}</h1>`;
  }

  renderIcon(): TemplateResult {
    return html`${disconnectorIcon}`;
  }

  render(): TemplateResult {
    return html`${this.renderHeader()}`;
  }
}
