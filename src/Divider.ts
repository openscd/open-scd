import {css, customElement, html, LitElement, TemplateResult} from "lit-element";

@customElement('openscd-divider')
export class DividerElement extends LitElement {
  render(): TemplateResult {
    return html `
      <div role="separator"></div>
    `
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
  `
}
