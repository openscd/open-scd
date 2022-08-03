import {
  customElement,
  css,
  LitElement,
  property,
  TemplateResult,
  html,
  query,
} from 'lit-element';
import { get, translate } from 'lit-translate';

import 'ace-custom-element';
import '@material/mwc-dialog';
import AceEditor from 'ace-custom-element';
import { Dialog } from '@material/mwc-dialog';

import { Create, Delete, identity, newActionEvent } from '../../foundation.js';

/** A dialog showing editable XML code*/
@customElement('code-editor-dialog')
export class CodeEditorDialog extends LitElement {
  /** The XML element to be edited */
  @property({ attribute: false })
  element!: Element;
  /** Whether the dialog is open */
  @property({ type: Boolean })
  open = false;

  @query('mwc-dialog') dialog!: Dialog;
  @query('ace-editor') aceEditor!: AceEditor;

  codeAction(): void {
    const text = this.aceEditor.value!;
    if (!text || !this.element.parentElement) return;

    const desc = {
      parent: this.element.parentElement,
      element: this.element,
      reference: this.element.nextSibling,
    };

    const del: Delete = {
      old: desc,
      checkValidity: () => true,
    };
    const cre: Create = {
      new: {
        ...desc,
        element: new DOMParser().parseFromString(text, 'application/xml')
          .documentElement,
      },
      checkValidity: () => true,
    };

    this.dispatchEvent(
      newActionEvent({
        actions: [del, cre],
        title: get('code.log', {
          id: identity(this.element),
        }),
      })
    );

    this.dialog.close();
  }

  render(): TemplateResult {
    return html`<mwc-dialog
      heading=${this.element.tagName}
      ?open=${this.open}
      @closed=${() => (this.open = false)}
    >
      <ace-editor
        base-path="/public/ace"
        wrap
        soft-tabs
        style="width: 80vw; height: calc(100vh - 240px);"
        theme="ace/theme/solarized_${localStorage.getItem('theme')}"
        mode="ace/mode/xml"
        value="${new XMLSerializer().serializeToString(this.element)}"
      ></ace-editor>
      <mwc-button
        slot="secondaryAction"
        dialogAction="close"
        label="${translate('close')}"
        style="--mdc-theme-primary: var(--mdc-theme-error)"
      ></mwc-button>
      <mwc-button
        slot="primaryAction"
        @click=${() => this.codeAction()}
        icon="code"
        label="${translate('save')}"
        trailingIcon
      ></mwc-button>
    </mwc-dialog>`;
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-max-width: 92vw;
    }
  `;
}
