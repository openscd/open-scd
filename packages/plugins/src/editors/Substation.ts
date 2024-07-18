import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-fab';

import './substation/zeroline-pane.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';
import { wizards } from '../wizards/wizard-library.js';

/** An editor [[`plugin`]] for editing the `Substation` section. */
export default class SubstationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  openCreateSubstationWizard(): void {
    const wizard = wizards['Substation'].create(this.doc.documentElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  render(): TemplateResult {
    return html` <zeroline-pane
        .editCount=${this.editCount}
        .doc=${this.doc}
      ></zeroline-pane>
      ${!this.doc?.querySelector(
        ':root > Substation, :root > Line, :root > Process'
      )
        ? html`<h1>
            <mwc-fab
              extended
              icon="add"
              label="${get('substation.wizard.title.add')}"
              @click=${() => this.openCreateSubstationWizard()}
            ></mwc-fab>
          </h1>`
        : html``}`;
  }

  static styles = css`
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
