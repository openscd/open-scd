import { css, CSSResultGroup, html, LitElement } from 'lit-element';

export default class DemoPlugin extends LitElement {
  static styles?: CSSResultGroup | undefined = css`
    :host {
      position: fixed;
      top: 0px;
      left: 0px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
  `;
  run() {}

  render() {
    return html`<section>This is a public demo</section>`;
  }
}
