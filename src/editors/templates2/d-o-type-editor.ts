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
import './d-a-editor.js';
import './d-o-editor.js';

import {
  getChildElementsByTagName,
  identity,
  newActionEvent,
  newWizardEvent,
} from '../../foundation.js';
import { dOTypeWizard } from '../templates/dotype-wizards.js';

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('d-o-type-editor')
export class DOTypeEditor extends LitElement {
  @property({ attribute: false })
  dOType!: Element;

  @property({ attribute: false })
  dOoRsDO?: Element;

  private header(): string {
    const id = this.dOType?.getAttribute('id');
    const desc = this.dOType?.getAttribute('desc');
    const cdc = this.dOType?.getAttribute('cdc');

    return `${cdc} ${id} ${desc ? `- ${desc} ` : ''}`;
  }

  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: { parent: this.dOType.parentElement!, element: this.dOType },
      })
    );
  }

  private openEditWizard(): void {
    const wizard = dOTypeWizard(
      identity(this.dOType) as string,
      this.dOType.ownerDocument
    );

    if (wizard)
      this.dispatchEvent(
        newWizardEvent(
          () =>
            dOTypeWizard(
              identity(this.dOType) as string,
              this.dOType.ownerDocument
            )!
        )
      );
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
      ${getChildElementsByTagName(this.dOType, 'SDO').map(
        sDO => html`<d-o-editor .dOoRsDO=${sDO}></d-o-editor>`
      )}
      ${getChildElementsByTagName(this.dOType, 'DA').map(
        dA => html`<d-a-editor .element=${dA}></d-a-editor>`
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
