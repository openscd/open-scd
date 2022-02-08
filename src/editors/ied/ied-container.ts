import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { translate } from "lit-translate";

import {wizards} from "../../wizards/wizard-library.js";
import '../../action-pane.js';
import './access-point-container.js';
import { Nsdoc } from '../../foundation/nsdoc.js';
import { getDescriptionAttribute, getNameAttribute, newWizardEvent } from '../../foundation.js';

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('ied-container')
export class IedContainer extends LitElement {
  /** The edited `Element`, a common property of all IED subcontainers. */
  @property({ attribute: false })
  element!: Element;

  @property()
  nsdoc!: Nsdoc;
  
  private openEditWizard(): void {
    const wizard = wizards['IED'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
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
        ></access-point-container>`)}
      </action-pane>`;
  }

  static styles = css``;
}
