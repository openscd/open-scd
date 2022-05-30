import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
} from 'lit-element';

import '@material/mwc-fab';

import '../../action-icon.js';
import { newWizardEvent, newActionEvent } from '../../foundation.js';
import { editConnectedAp104Wizard } from './wizards/connectedap.js';

/** [[`104`]] subeditor for a `ConnectedAP` element. */
@customElement('connectedap-104-editor')
export class ConnectedAP104Editor extends LitElement {
  /** SCL element ConnectedAP */
  @property({ attribute: false })
  element!: Element;

  private openEditWizard(): void {
    this.dispatchEvent(newWizardEvent(editConnectedAp104Wizard(this.element)));
  }

  remove(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement!,
            element: this.element,
            reference: this.element.nextSibling,
          },
        })
      );
  }

  render(): TemplateResult {
    return html`
      <action-icon label="${this.element.getAttribute('apName') ?? 'UNDEFINED'}" icon="settings_input_hdmi"
        ><mwc-fab
          slot="action"
          mini
          icon="edit"
          @click="${() => this.openEditWizard()}"
        ></mwc-fab>
        <mwc-fab
          slot="action"
          mini
          icon="delete"
          @click="${() => this.remove()}}"
        ></mwc-fab
      ></action-icon>
    `;
  }
}
