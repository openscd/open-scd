import {
  LitElement,
  customElement,
  property,
  html,
  TemplateResult,
  query,
} from 'lit-element';

@customElement('voltage-level-editor')
export class VoltageLevelEditor extends LitElement {
  @property()
  parent!: Element;
  @property()
  element!: Element;
  @property({ type: String })
  get name(): string {
    return this.element?.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string {
    return this.element?.getAttribute('desc') ?? '';
  }

  @query('h1') header!: Element;

  renderHeader(): TemplateResult {
    return html`<h1>
      ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
    </h1>`;
  }

  render(): TemplateResult {
    return html`${this.renderHeader()}`;
  }
}
