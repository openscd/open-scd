import {
  LitElement,
  TemplateResult,
  html,
  customElement,
  property,
  state,
  css,
} from 'lit-element';

import '@material/mwc-icon';

import '@openscd/open-scd/src/action-icon.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';
import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { sizableGooseIcon } from '@openscd/open-scd/src/icons/icons.js';
import { editGseWizard } from '../../wizards/gse.js';
import { canMoveCommunicationElementToConnectedAP, getAllConnectedAPsOfSameIED } from './foundation.js';

@customElement('gse-editor')
export class GseEditor extends LitElement {
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
    this.dispatchEvent(newWizardEvent(editGseWizard(this.element)));
  }

  private openGseMoveDialog(): void {
    this.dispatchEvent(
      new CustomEvent('request-gse-move', {
        detail: { element: this.element },
        bubbles: true,
        composed: true,
      })
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
    const validTargetConnectedAPs = getAllConnectedAPsOfSameIED(
      this.element,
      this.doc
    ).filter(cap => canMoveCommunicationElementToConnectedAP(
        this.element!,
        cap,
        this.doc
      ));
    const hasValidConnectedAPMoveTarget = validTargetConnectedAPs.length > 0;

    return html`<action-icon label="${this.label}" .icon="${sizableGooseIcon}"
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
        @click="${() => this.remove()}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="forward"
        class="gse-move-button"
        ?disabled="${!hasValidConnectedAPMoveTarget}"
        @click="${() => this.openGseMoveDialog()}"
      >
      </mwc-fab>
    </action-icon> `;
  }

  static styles = css`
    :host(:focus-within) .gse-move-button[disabled] {
      color: var(--mdc-theme-text-disabled-on-light, #9e9e9e);
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;
}
