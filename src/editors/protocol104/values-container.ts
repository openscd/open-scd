import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult
} from "lit-element";

import { getNameAttribute } from "../../foundation.js";

import './ied-container.js';

@customElement('values-104-container')
export class Values104Container extends LitElement {
  @property()
  doc!: XMLDocument;

  private getIEDElements(): Element[] {
    return Array.from(this.doc.querySelectorAll('IED'))
      .filter(ied => ied.querySelectorAll('DAI > Private[type="IEC_60870_5_104"]').length > 0)
      .sort((ied1, ied2) => (getNameAttribute(ied1) ?? '').localeCompare(getNameAttribute(ied2) ?? '') )
  }

  render(): TemplateResult {
    return html `
      ${this.getIEDElements().map(iedElement => {
        return html `<ied-104-container .element="${iedElement}"></ied-104-container>`;
      })}
    `;
  }
}
