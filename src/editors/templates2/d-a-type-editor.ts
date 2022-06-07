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

import {
  getChildElementsByTagName,
  identity,
  newActionEvent,
  newWizardEvent,
} from '../../foundation.js';
import { editDaTypeWizard } from '../templates/datype-wizards.js';

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('d-a-type-editor')
export class DATypeEditor extends LitElement {
  @property({ attribute: false })
  dAType!: Element;

  @property({ attribute: false })
  dAoRbDA?: Element;

  private header(): string {
    const id = this.dAType.getAttribute('id');
    const desc = this.dAType.getAttribute('desc');

    return `${id} ${desc ? `- ${desc} ` : ''}`;
  }

  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: { parent: this.dAType.parentElement!, element: this.dAType },
      })
    );
  }

  private openEditWizard(): void {
    const wizard = editDaTypeWizard(
      identity(this.dAType) as string,
      this.dAType.ownerDocument
    );

    if (wizard)
      this.dispatchEvent(
        newWizardEvent(
          () =>
            editDaTypeWizard(
              identity(this.dAType) as string,
              this.dAType.ownerDocument
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
      ${getChildElementsByTagName(this.dAType, 'BDA').map(
        bDA => html`<d-a-editor class="child" .element=${bDA}></d-a-editor>`
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
