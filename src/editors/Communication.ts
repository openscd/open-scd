import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate, get } from 'lit-translate';

import '@material/mwc-fab';

import './communication/subnetwork-editor.js';
import {
  newWizardEvent,
  newActionEvent,
  createElement,
  isPublic,
} from '../foundation.js';
import { createSubNetworkWizard } from '../wizards/subnetwork.js';

/** An editor [[`plugin`]] for editing the `Communication` section. */
export default class CommunicationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  private createCommunication(): void {
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
  private openCreateSubNetworkWizard(): void {
    const parent = this.doc.querySelector(':root > Communication');
    if (!parent) this.createCommunication();

    this.dispatchEvent(newWizardEvent(createSubNetworkWizard(parent!)));
  }

  render(): TemplateResult {
    if (!this.doc?.querySelector(':root > Communication >SubNetwork'))
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
      ></mwc-fab>
      <section>
        ${Array.from(this.doc.querySelectorAll('SubNetwork') ?? [])
          .filter(isPublic)
          .map(
            subnetwork =>
              html`<subnetwork-editor
                .element=${subnetwork}
              ></subnetwork-editor>`
          )}
      </section> `;
  }

  static styles = css`
    :host {
      width: 100vw;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    section {
      outline: none;
      padding: 8px 12px 16px;
    }

    subnetwork-editor {
      margin: 8px 12px 16px;
    }

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }
  `;
}
