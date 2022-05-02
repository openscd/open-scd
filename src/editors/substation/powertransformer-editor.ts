import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-icon';

import '../../action-icon.js';
import { powerTransformerTwoWindingIcon } from '../../icons/icons.js';
import { wizards } from '../../wizards/wizard-library.js';
import { newActionEvent, newWizardEvent } from '../../foundation.js';
import { startMove } from './foundation.js';
import { SubstationEditor } from './substation-editor.js';
import { BayEditor } from './bay-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';

/** [[`SubstationEditor`]] subeditor for a child-less `PowerTransformer` element. */
@customElement('powertransformer-editor')
export class PowerTransformerEditor extends LitElement {
  /** SCL element PowerTransformer */
  @property({ attribute: false })
  element!: Element;

  /** PowerTransformer name attribute */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? 'UNDEFINED';
  }

  private openEditWizard(): void {
    const wizard = wizards['PowerTransformer'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openLNodeWizard(): void {
    const wizard = wizards['LNode'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private removeElement(): void {
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
    return html`<action-icon
      label="${this.name}"
      .icon="${powerTransformerTwoWindingIcon}"
    >
      <mwc-fab
        slot="action"
        class="edit"
        mini
        @click="${() => this.openEditWizard()}"
        icon="edit"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.removeElement()}}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() => {
          startMove(this, PowerTransformerEditor, [
            SubstationEditor,
            VoltageLevelEditor,
            BayEditor,
          ]);
        }}"
        icon="forward"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() => this.openLNodeWizard()}"
        icon="account_tree"
      ></mwc-fab>
    </action-icon> `;
  }

  static styles = css`
    :host(.moving) {
      opacity: 0.3;
    }
  `;
}
