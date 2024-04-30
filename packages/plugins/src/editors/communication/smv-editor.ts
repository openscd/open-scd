import {
  LitElement,
  TemplateResult,
  html,
  customElement,
  property,
  state,
} from 'lit-element';

import '@material/mwc-icon';

import '@openscd/open-scd/src/action-icon.js';
import { sizableSmvIcon } from '@openscd/open-scd/src/icons/icons.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';
import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { editSMvWizard } from '../../wizards/smv.js';

@customElement('smv-editor')
export class SmvEditor extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ attribute: false })
  element!: Element;

  @state()
  get label(): string {
    return (
      this.element.getAttribute('ldInst') +
      '/' +
      this.element.getAttribute('cbName')
    );
  }

  private openEditWizard(): void {
    this.dispatchEvent(newWizardEvent(editSMvWizard(this.element)));
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
    return html`<action-icon label="${this.label}" .icon="${sizableSmvIcon}"
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
    ></action-icon>`;
  }
}
