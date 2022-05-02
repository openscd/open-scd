import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-fab';

import '../../action-icon.js';
import '../../action-pane.js';
import { startMove, getIcon } from './foundation.js';
import { newActionEvent, newWizardEvent } from '../../foundation.js';
import { BayEditor } from './bay-editor.js';
import { wizards } from '../../wizards/wizard-library.js';

/** [[`SubstationEditor`]] subeditor for a `ConductingEquipment` element. */
@customElement('conducting-equipment-editor')
export class ConductingEquipmentEditor extends LitElement {
  /** SCL element ConductingEquipment */
  @property({ attribute: false })
  element!: Element;
  /** ConductingEquipment name attribute */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  /** Wheter `Function` and `SubFunction` are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  private openEditWizard(): void {
    const wizard = wizards['ConductingEquipment'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openLNodeWizard(): void {
    const wizard = wizards['LNode'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
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

  renderContentPane(): TemplateResult {
    return html`<mwc-icon slot="icon" style="width:24px;height:24px"
        >${getIcon(this.element)}</mwc-icon
      >
      <abbr slot="action" title="${translate('lnode.tooltip')}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() => this.openLNodeWizard()}"
          icon="account_tree"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          slot="action"
          mini
          icon="edit"
          @click="${() => this.openEditWizard()}}"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('move')}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() =>
            startMove(this, ConductingEquipmentEditor, [BayEditor])}"
          icon="forward"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('remove')}">
        <mwc-icon-button
          slot="action"
          mini
          icon="delete"
          @click="${() => this.remove()}}"
        ></mwc-icon-button>
      </abbr> `;
  }

  renderContentIcon(): TemplateResult {
    return html`<mwc-icon slot="icon">${getIcon(this.element)}</mwc-icon>
      <mwc-fab
        slot="action"
        mini
        @click="${() => this.openLNodeWizard()}"
        icon="account_tree"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="edit"
        @click="${() => this.openEditWizard()}}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() =>
          startMove(this, ConductingEquipmentEditor, [BayEditor])}"
        icon="forward"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.remove()}}"
      ></mwc-fab>`;
  }

  render(): TemplateResult {
    if (this.showfunctions)
      return html`<action-pane label="${this.name}"
        >${this.renderContentPane()}</action-pane
      >`;

    return html`<action-icon label="${this.name}"
      >${this.renderContentIcon()}</action-icon
    >`;
  }

  static styles = css`
    :host(.moving) {
      opacity: 0.3;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
