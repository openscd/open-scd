import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

@customElement('wizard-divider')
export class WizardDividerElement extends LitElement {
  @property({
    type: String,
  })
  header?: string;

  render(): TemplateResult {
    return html` ${this.renderHeader()} ${this.renderSeparator()}`;
  }

  private renderHeader(): TemplateResult {
    if (!this.header) {
      return html``;
    }

    return html`<h4 class="header">${this.header}</h4>`;
  }

  private renderSeparator(): TemplateResult {
    return html`<div role="separator"></div>`;
  }

  static styles = css`
    div {
      height: 0px;
      margin: 10px 0px 10px 0px;
      border-top: none;
      border-right: none;
      border-left: none;
      border-image: initial;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
  `;
}
