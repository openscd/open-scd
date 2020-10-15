import {
  customElement,
  LitElement,
  html,
  TemplateResult,
  property,
  query,
  css,
} from 'lit-element';
import {
  disconnectorIcon,
  circuitBreakerIcon,
  currentTransformerIcon,
  voltageTransformerIcon,
} from '../../icons.js';

const typeIcons: Partial<Record<string, TemplateResult>> = {
  DIS: disconnectorIcon,
  CBR: circuitBreakerIcon,
  CTR: currentTransformerIcon,
  VTR: voltageTransformerIcon,
  missing: disconnectorIcon,
};

@customElement('conducting-equipment-editor')
export class ConductingEquipmentEditor extends LitElement {
  @property({ type: Element })
  element!: Element;
  @property({ type: Element })
  parent!: Element;
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string {
    return this.element.getAttribute('desc') ?? '';
  }
  @property({ type: String })
  get type(): string {
    return this.element.getAttribute('type') ?? 'missing';
  }

  @query('h1') header!: Element;

  renderHeader(): TemplateResult {
    return html`<h1 id="header">
      <mwc-icon-button icon="delete"></mwc-icon-button>
      <mwc-icon-button icon="edit"></mwc-icon-button>${this.name}
    </h1>`;
  }

  render(): TemplateResult {
    return html`<div id="condEqContainer">
      ${this.renderHeader()} ${typeIcons[this.type] ?? disconnectorIcon}
    </div>`;
  }

  static styles = css`
    #condEqContainer {
      position: relative;
      top: 5px;
      left: 20px;
      border: 2px solid var(--mdc-theme-primary);
      max-width: 200px;
      margin: 10px;
    }

    #header {
      background-color: var(--mdc-theme-primary);
      color: var(--mdc-theme-surface);
      margin: 0px;
    }

    svg {
      width: 100px;
      height: 100px;
      position: relative;
      top: 3px;
      left: 3px;
    }
  `;
}
