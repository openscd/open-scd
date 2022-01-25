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
import { gooseIcon, smvIcon, reportIcon } from '../icons.js';
import { wizards } from '../wizards/wizard-library.js';
import { newWizardEvent } from '../foundation.js';
import { selectGseControlWizard } from '../wizards/gsecontrol.js';
import { selectSampledValueControlWizard } from '../wizards/sampledvaluecontrol.js';
import { selectReportControlWizard } from '../wizards/reportcontrol.js';

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

  private openEditWizard(): void {
    const wizard = wizards['IED'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openReportControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() => selectReportControlWizard(this.element))
    );
  }

  private openGseControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() => selectGseControlWizard(this.element))
    );
  }

  private openSmvControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() => selectSampledValueControlWizard(this.element))
    );
  }

  private openCommunicationMapping(): void {
    const sendingIeds = Array.from(
      this.element.closest('SCL')?.querySelectorAll('IED') ?? []
    );
    const wizard = createClientLnWizard(sendingIeds, this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  render(): TemplateResult {
    return html`<action-icon label="${this.name}" icon="developer_board">
      <mwc-fab
        slot="action"
        class="edit"
        mini
        @click="${() => this.openEditWizard()}"
        icon="edit"
      ></mwc-fab
      ><mwc-fab
        slot="action"
        class="selectgse"
        mini
        @click="${() => this.openGseControlSelection()}"
        ><mwc-icon slot="icon">${gooseIcon}</mwc-icon></mwc-fab
      ><mwc-fab
        slot="action"
        class="selectreport"
        mini
        @click="${() => this.openReportControlSelection()}"
        ><mwc-icon slot="icon">${reportIcon}</mwc-icon></mwc-fab
      ><mwc-fab
        slot="action"
        class="selectsmv"
        mini
        @click="${() => this.openSmvControlSelection()}"
        ><mwc-icon slot="icon">${smvIcon}</mwc-icon></mwc-fab
      ><mwc-fab
        slot="action"
        class="connectreport"
        mini
        @click="${() => this.openCommunicationMapping()}"
        icon="add_link"
      ></mwc-fab
    ></action-icon> `;
  }
}
