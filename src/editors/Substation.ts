import { LitElement, TemplateResult, property, css } from 'lit-element';
import { get } from 'lit-translate';

import { Fab, html, newWizardEvent } from '../foundation.js';
import { wizards } from '../wizards/wizard-library.js';
import { ZerolinePane } from '../zeroline-pane.js';

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
    return html` <${ZerolinePane} .doc=${this.doc}></${ZerolinePane}>
      ${
        !this.doc?.querySelector(':root > Substation')
          ? html`<h1>
              <${Fab}
                extended
                icon="add"
                label="${get('substation.wizard.title.add')}"
                @click=${() => this.openCreateSubstationWizard()}
              ></${Fab}>
            </h1>`
          : html``
      }`;
  }

  static styles = css`
    c-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }
  `;
}
