import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate, get } from 'lit-translate';

import {
  newWizardEvent,
  newActionEvent,
  createElement,
} from '../foundation.js';

import { selectors, styles } from './communication/foundation.js';

import './communication/subnetwork-editor.js';
import { subNetworkWizard } from './communication/subnetwork-editor.js';

/** An editor [[`plugin`]] for editing the `Communication` section. */
export default class CommunicationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  createCommunication(): void {
    this.dispatchEvent(
      newActionEvent({
        new: {
          parent: this.doc.documentElement,
          element: createElement(this.doc, 'Communication', {}),
        },
      })
    );
  }

  /** Opens a [[`WizardDialog`]] for creating a new `SubNetwork` element. */
  openCreateSubNetworkWizard(): void {
    if (!this.doc.querySelector(selectors.Communication))
      this.createCommunication();

    this.dispatchEvent(
      newWizardEvent(
        subNetworkWizard({
          parent: this.doc.querySelector('Communication')!,
        })
      )
    );
  }

  render(): TemplateResult {
    if (!this.doc?.querySelector(selectors.SubNetwork))
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('communication.missing')}</span
        ><mwc-fab
          extended
          icon="add"
          label="${get('subnetwork.wizard.title.add')}"
          @click=${() => this.openCreateSubNetworkWizard()}
        ></mwc-fab>
      </h1>`;
    return html`<mwc-fab
        extended
        icon="add"
        label="${get('subnetwork.wizard.title.add')}"
        @click=${() => this.openCreateSubNetworkWizard()}
      ></mwc-fab
      >${Array.from(this.doc.querySelectorAll(selectors.SubNetwork) ?? []).map(
        subnetwork =>
          html`<subnetwork-editor .element=${subnetwork}></subnetwork-editor>`
      )}`;
  }

  static styles = css`
    ${styles}

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }
  `;
}
