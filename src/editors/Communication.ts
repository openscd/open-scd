import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-fab';
import { selectors, styles } from './communication/foundation.js';

//import { newWizardEvent } from '../foundation.js';

/* import './substation/substation-editor.js';
import { SubstationEditor } from './substation/substation-editor.js'; */

/** An editor [[`plugin`]] for editing the `Cpommunication` section. */
export default class CommunicationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** Opens a [[`WizardDialog`]] for creating a new `SubNetwork` element. */
  /* openCreateSubNetworkWizard(): void {
    this.dispatchEvent(
      newWizardEvent(
        SubstationEditor.wizard({ parent: this.doc.documentElement })
      )
    );
  } */

  render(): TemplateResult {
    if (!this.doc?.querySelector(selectors.SubNetwork))
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('communication.missing')}</span
        >
      </h1>`;
    return html``;
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
