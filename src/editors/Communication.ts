import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate, get } from 'lit-translate';

import '@material/mwc-fab';

import { selectors, styles } from './communication/foundation.js';

import {
  newWizardEvent,
  newActionEvent,
  createElement,
} from '../foundation.js';

import './communication/subnetwork-editor.js';
import { SubNetworkEditor } from './communication/subnetwork-editor.js';

/** An editor [[`plugin`]] for editing the `Communication` section. */
export default class CommunicationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** Opens a [[`WizardDialog`]] for creating a new `SubNetwork` element. */
  openCreateSubNetworkWizard(): void {
    if (!this.doc.querySelector(selectors.Communication))
      this.dispatchEvent(
        newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: createElement(this.doc, 'Communication', {}),
            reference:
              this.doc.querySelector(':root > IED') ||
              this.doc.querySelector(':root > DataTypeTemplate') ||
              null,
          },
        })
      );
    this.dispatchEvent(
      newWizardEvent(
        SubNetworkEditor.wizard({
          parent: this.doc.documentElement.querySelector(
            selectors.Communication
          )!,
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
