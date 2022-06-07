import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '../../action-pane.js';
import './d-o-type-editor.js';
import './d-o-editor.js';

import {
  getChildElementsByTagName,
  identity,
  newActionEvent,
  newWizardEvent,
} from '../../foundation.js';
import { lNodeTypeWizard } from '../templates/lnodetype-wizard.js';

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('l-node-type-editor')
export class LNodeTypeEditor extends LitElement {
  @property({ attribute: false })
  element!: Element;

  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: { parent: this.element.parentElement!, element: this.element },
      })
    );
  }

  private openEditWizard(): void {
    const wizard = lNodeTypeWizard(
      identity(this.element) as string,
      this.element.ownerDocument
    );
    if (wizard)
      this.dispatchEvent(
        newWizardEvent(
          () =>
            lNodeTypeWizard(
              identity(this.element) as string,
              this.element.ownerDocument
            )!
        )
      );
  }

  private header(): string {
    const id = this.element.getAttribute('id');
    const desc = this.element.getAttribute('desc');
    const lnClass = this.element.getAttribute('lnClass');

    return `${lnClass} ${desc ? `- ${desc} ` : ''}(${id})`;
  }

  render(): TemplateResult {
    return html` <action-pane label="${this.header()}">
      <abbr slot="action" title="${translate('remove')}">
        <mwc-icon-button icon="delete" @click=${this.remove}></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      ${getChildElementsByTagName(this.element, 'DO').map(
        dO => html`<d-o-editor .dOoRsDO=${dO}></d-o-editor>`
      )}
    </action-pane>`;
  }

  static styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
