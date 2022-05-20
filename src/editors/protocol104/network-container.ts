import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import { getNameAttribute } from "../../foundation.js";

import './subnetwork-container.js';

@customElement('network-104-container')
export class Network104Container extends LitElement {
  @property()
  doc!: XMLDocument;

  private getSubNetworkElements(): Element[] {
    return Array.from(this.doc.querySelectorAll('Communication > SubNetwork'))
      .filter(network => network.getAttribute('type') === '104')
      .sort((network1, network2) => (getNameAttribute(network1) ?? '').localeCompare(getNameAttribute(network2) ?? '') )
  }

  render(): TemplateResult {
    return html `
      ${this.getSubNetworkElements().map(network => {
        return html`<subnetwork-104-container .element=${network}></subnetwork-104-container>`;
      })}
    `;
  }
}
