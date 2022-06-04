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
import { editConnectedApWizard } from '../../wizards/connectedap.js';

/** [[`Communication`]] subeditor for a `ConnectedAP` element. */
@customElement('connectedap-editor')
export class ConnectedAPEditor extends LitElement {
  /** SCL element ConnectedAP */
  @property({ attribute: false })
  element!: Element;
  /** ConnectedAP attribute apName */
  @property({ type: String })
  get apName(): string {
    return this.element.getAttribute('apName') ?? 'UNDEFINED';
  }

  private openEditWizard(): void {
    this.dispatchEvent(newWizardEvent(editConnectedApWizard(this.element)));
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
      <action-icon label="${this.apName}" icon="settings_input_hdmi"
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
