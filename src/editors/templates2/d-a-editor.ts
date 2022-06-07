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

import { newActionEvent, newWizardEvent } from '../../foundation.js';
import { getReferencedChild } from './foundation.js';
import { editDAWizard } from '../../wizards/da.js';
import { editBDAWizard } from '../../wizards/bda.js';

/** [[`IED`]] plugin subeditor for editing `IED` element. */
@customElement('d-a-editor')
export class DAEditor extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): string {
    const name = this.element.getAttribute('name');
    const desc = this.element.getAttribute('desc');

    return `${name}${desc ? ` - ${desc} ` : ''}`;
  }

  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: { parent: this.element.parentElement!, element: this.element },
      })
    );
  }

  private openEditWizard(): void {
    if (this.element.tagName === 'DA') {
      const wizard = editDAWizard(this.element);

      if (wizard)
        this.dispatchEvent(newWizardEvent(() => editDAWizard(this.element)));
    }

    if (this.element.tagName === 'BDA') {
      const wizard = editBDAWizard(this.element);

      if (wizard)
        this.dispatchEvent(newWizardEvent(() => editBDAWizard(this.element)));
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
      ${getReferencedChild(this.element)
        ? html`<d-a-type-editor
            class="child"
            .dAoRbDA=${this.element}
            .dAType=${getReferencedChild(this.element)!}
          ></d-a-type-editor>`
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
