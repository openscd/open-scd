import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { newWizardEvent } from '../foundation.js';
import { communicationMappingWizard } from './ied/communication-mapping.js';
import { styles } from './ied/foundation.js';

export default class IedPlugin extends LitElement {
  @property()
  doc!: XMLDocument;

  /** Opens a [[`WizardDialog`]] to map connections between `IED`s. */
  editCommunication(): void {
    this.dispatchEvent(newWizardEvent(communicationMappingWizard(this.doc!)));
  }

  render(): TemplateResult {
    return html`<mwc-fab
      extended
      icon="import_export"
      label="trans: Communication Mapping"
      @click="${() => this.editCommunication()}"
    ></mwc-fab>`;
  }

  static styles = css`
    ${styles}
    /* #mapping {
      --mdc-dialog-max-width: 92vw;
    } */
    /* mwc-list {
      display: inline-block;
    } */
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
