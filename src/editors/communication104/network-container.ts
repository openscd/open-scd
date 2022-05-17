import {css, customElement, html, LitElement, TemplateResult} from "lit-element";

@customElement('network-104-container')
export class NetworkContainer extends LitElement {
  render(): TemplateResult {
    return html`
      <p>Network Container</p>
    `;
  }

  static styles = css`
  `;
}
