import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate, get } from 'lit-translate';

import { newWizardEvent } from '../foundation.js';
import { wizards } from '../wizards/wizard-library.js';

/** An editor [[`plugin`]] for editing the `Substation` section. */
export default class SubstationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  openCreateSubstationWizard(): void {
    const wizard = wizards['Substation'].create(this.doc.documentElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  render(): TemplateResult {
    if (!this.doc?.querySelector(':root > Substation'))
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('substation.missing')}</span
        >
        <mwc-fab
          extended
          icon="add"
          label="${get('substation.wizard.title.add')}"
          @click=${() => this.openCreateSubstationWizard()}
        ></mwc-fab>
      </h1>`;
    return html` <zeroline-pane .doc=${this.doc}></zeroline-pane> `;
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
