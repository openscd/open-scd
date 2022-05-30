import { get } from "lit-translate";
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult
} from "lit-element";

import './subnetwork-container.js';
import {
  compareNames,
  createElement,
  newActionEvent,
  newWizardEvent
} from "../../foundation.js";
import { createSubNetworkWizard } from "./wizards/subnetwork.js";

@customElement('network-104-container')
export class Network104Container extends LitElement {
  @property()
  doc!: XMLDocument;

  private getSubNetworkElements(): Element[] {
    return Array.from(this.doc.querySelectorAll('Communication > SubNetwork') ?? [])
      .filter(network => network.getAttribute('type') === '104')
      .sort((a,b) => compareNames(a,b));
  }

  /** Opens a [[`WizardDialog`]] for creating a new `SubNetwork` element. */
  private openCreateSubNetworkWizard(): void {
    const parent = this.doc.querySelector(':root > Communication');
    if (!parent) {
      this.dispatchEvent(
        newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: createElement(this.doc, 'Communication', {}),
          },
        })
      );
    }
    this.dispatchEvent(newWizardEvent(createSubNetworkWizard(parent!)));
  }

  render(): TemplateResult {
    return html`<mwc-fab
      extended
      icon="add"
      label="${get('subnetwork.wizard.title.add')}"
      @click=${() => this.openCreateSubNetworkWizard()}
    ></mwc-fab>
    <section>
    ${this.getSubNetworkElements()
        .map(
          subnetwork =>
            html`<subnetwork-104-container
            .element=${subnetwork}
          ></subnetwork-104-container>`
        )}
    </section>`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }
    
    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    subnetwork-104-container {
      margin: 8px 12px 16px;
    }
  `;
}
