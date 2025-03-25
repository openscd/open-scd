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

import '@openscd/open-scd/src/action-icon.js';
import { createClientLnWizard } from '../../wizards/clientln.js';
import { wizards } from '../../wizards/wizard-library.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';
import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { selectGseControlWizard } from '../../wizards/gsecontrol.js';
import { selectSampledValueControlWizard } from '../../wizards/sampledvaluecontrol.js';
import { selectReportControlWizard } from '../../wizards/reportcontrol.js';
import { removeIEDWizard } from '../../wizards/ied.js';

/** [[`SubstationEditor`]] subeditor for a child-less `IED` element. */
@customElement('ied-editor')
export class IedEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
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

  private removeIED(): void {
    const wizard = removeIEDWizard(this.element);
    if (wizard) {
      this.dispatchEvent(newWizardEvent(() => wizard));
    } else {
      // If no Wizard is needed, just remove the element.
      this.dispatchEvent(
        newActionEvent({
          old: { parent: this.element.parentElement!, element: this.element },
        })
      );
    }
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
        class="delete"
        mini
        @click="${() => this.removeIED()}"
        icon="delete"
      ></mwc-fab
      ><mwc-fab
        slot="action"
        class="connectreport"
        mini
        @click="${() => this.openCommunicationMapping()}"
        icon="add_link"
      ></mwc-fab
      ></action-icon
    > `;
  }
}
