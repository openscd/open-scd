import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult
} from "lit-element";

@customElement('subnetwork-104-container')
export class SubNetwork104Container extends LitElement {
  @property()
  element!: Element;

  render(): TemplateResult {
    return html`<h4>${this.element.getAttribute('name')}</h4>`;
  }
}
