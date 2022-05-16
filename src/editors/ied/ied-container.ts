import {
  css,
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { translate } from "lit-translate";

import '../../action-pane.js';
import './access-point-container.js';

import { wizards } from "../../wizards/wizard-library.js";
import { Nsdoc } from '../../foundation/nsdoc.js';
import { Container } from './foundation.js';
import {
  getDescriptionAttribute,
  getNameAttribute,
  newActionEvent,
  newWizardEvent} from '../../foundation.js';
import { removeIEDWizard } from "../../wizards/ied.js";

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('ied-container')
export class IedContainer extends Container {
  @property()
  nsdoc!: Nsdoc;

  private openEditWizard(): void {
    const wizard = wizards['IED'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private removeIED(): void {
    const wizard = removeIEDWizard(this.element);
    if (wizard) {
      this.dispatchEvent(newWizardEvent(() => wizard));
    } else {
      // If no Wizard is needed, just remove the element.
      this.dispatchEvent(newActionEvent({ old: { parent: this.element.parentElement!, element: this.element } }));
    }
  }

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`
      <action-pane .label="${this.header()}">
        <mwc-icon slot="icon">developer_board</mwc-icon>
        <abbr slot="action" title="${translate('remove')}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.removeIED()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        ${Array.from(this.element.querySelectorAll(':scope > AccessPoint')).map(
          ap => html`<access-point-container
            .element=${ap}
            .nsdoc=${this.nsdoc}
            .ancestors=${[this.element]}
          ></access-point-container>`)}
      </action-pane>`;
  }

  static styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
