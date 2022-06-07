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
import './d-a-type-editor.js';

import { identity, newActionEvent, newWizardEvent } from '../../foundation.js';
import { sDOWizard } from '../templates/dotype-wizards.js';
import { dOWizard } from '../templates/lnodetype-wizard.js';
import { getReferencedChild } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('d-o-editor')
export class DOEditor extends LitElement {
  @property({ attribute: false })
  dOoRsDO!: Element;

  private header(): string {
    const name = this.dOoRsDO.getAttribute('name');
    const desc = this.dOoRsDO.getAttribute('desc');

    return `${name}${desc ? ` - ${desc} ` : ''}`;
  }

  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: { parent: this.dOoRsDO.parentElement!, element: this.dOoRsDO },
      })
    );
  }

  private openEditWizard(): void {
    if (!this.dOoRsDO) return;

    if (this.dOoRsDO.tagName === 'DO') {
      const wizard = dOWizard({
        identity: identity(this.dOoRsDO) as string,
        doc: this.dOoRsDO.ownerDocument,
      });

      if (wizard)
        this.dispatchEvent(
          newWizardEvent(
            () =>
              dOWizard({
                identity: identity(this.dOoRsDO!) as string,
                doc: this.dOoRsDO!.ownerDocument,
              })!
          )
        );
    }

    if (this.dOoRsDO.tagName === 'SDO') {
      const wizard = sDOWizard({
        identity: identity(this.dOoRsDO) as string,
        doc: this.dOoRsDO.ownerDocument,
      });

      if (wizard)
        this.dispatchEvent(
          newWizardEvent(
            () =>
              sDOWizard({
                identity: identity(this.dOoRsDO!) as string,
                doc: this.dOoRsDO!.ownerDocument,
              })!
          )
        );
    }
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
      ${getReferencedChild(this.dOoRsDO)
        ? html`<d-o-type-editor
            class="child"
            .dOoRsDO=${this.dOoRsDO}
            .dOType=${getReferencedChild(this.dOoRsDO)!}
          ></d-o-type-editor>`
        : html``}
    </action-pane>`;
  }

  static styles = css`
    action-pane:focus-within .child {
      display: block;
    }

    .child {
      display: none;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
