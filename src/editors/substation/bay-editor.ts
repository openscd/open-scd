import {
  customElement,
  LitElement,
  TemplateResult,
  html,
  property,
  css,
} from 'lit-element';

@customElement('bay-editor')
export class BayEditor extends LitElement {
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

  renderHeader(): TemplateResult {
    return html`<h1>
      ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
    </h1> `;
  }

  render(): TemplateResult {
    return html`${this.renderHeader()}`;
  }

  static styles = css`
    h1 {
      background: var(--mdc-theme-primary);
      color: var(--mdc-theme-surface);
      margin-top: 5px;
      margin-left: 10px;
      min-width: 200px;
    }
  `;
}
