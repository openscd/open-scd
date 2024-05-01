import { customElement, html, property, TemplateResult } from 'lit-element';

import '@material/mwc-fab';

import '@openscd/open-scd/src/action-icon.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';
import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { editConnectedApWizard } from './wizards/connectedap.js';
import { Base104Container } from './base-container.js';

/** [[`104`]] subeditor for a `ConnectedAP` element. */
@customElement('connectedap-104-editor')
export class ConnectedAP104Editor extends Base104Container {
  /** SCL element ConnectedAP */
  @property({ attribute: false })
  element!: Element;

  private openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(() =>
        editConnectedApWizard(
          this.element,
          this.element.querySelectorAll('Address > P[type^="RG"]').length > 0
        )
      )
    );
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
      <action-icon
        label="${this.element.getAttribute('apName') ?? 'UNDEFINED'}"
        icon="settings_input_hdmi"
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
