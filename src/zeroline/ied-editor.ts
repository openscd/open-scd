import {
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-icon';
import { Fab } from '@material/mwc-fab';

import '../action-icon.js';
import { createClientLnWizard } from '../wizards/clientln.js';
import { gooseIcon, smvIcon } from '../icons.js';
import { newWizardEvent } from '../foundation.js';
import { selectGseControlWizard } from '../wizards/gsecontrol.js';
import { selectSampledValueControlWizard } from '../wizards/sampledvaluecontrol.js';

/** [[`SubstationEditor`]] subeditor for a child-less `IED` element. */
@customElement('ied-editor')
export class IedEditor extends LitElement {
  /** SCL element IED */
  @property({ attribute: false })
  element!: Element;
  /** IED name attribute */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? 'UNDEFINED';
  }

  @query('.connectreport') connectReport!: Fab;

  private openCommunicationMapping(): void {
    const sendingIeds = Array.from(
      this.element.closest('SCL')?.querySelectorAll('IED') ?? []
    );
    const wizard = createClientLnWizard(sendingIeds, this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openGseControlSelection(): void {
    const wizard = selectGseControlWizard(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openSmvControlSelection(): void {
    const wizard = selectSampledValueControlWizard(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  render(): TemplateResult {
    return html`<action-icon label="${this.name}" icon="developer_board"
      ><mwc-fab
        slot="action"
        class="connectreport"
        mini
        @click="${() => this.openCommunicationMapping()}"
        icon="add_link"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        class="selectgse"
        mini
        @click="${() => this.openGseControlSelection()}"
        ><mwc-icon slot="icon">${gooseIcon}</mwc-icon></mwc-fab
      ><mwc-fab
        slot="action"
        class="selectsmv"
        mini
        @click="${() => this.openSmvControlSelection()}"
        ><mwc-icon slot="icon">${smvIcon}</mwc-icon></mwc-fab
      ></action-icon
    > `;
  }
}
