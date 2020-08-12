import {
  LitElement,
  html,
  TemplateResult,
  internalProperty,
  property,
} from 'lit-element';

import '@material/mwc-dialog';
import '@material/mwc-fab';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base';
import { TextField } from '@material/mwc-textfield';
export class SubstationEditorBase extends LitElement {
  @internalProperty()
  doc: Element | null = null;

  @property({ type: String })
  get name(): string | null {
    return this.doc?.getAttribute('name') ?? null;
  }

  @property({ type: String })
  get desc(): string | null {
    return this.doc?.getAttribute('desc') ?? null;
  }

  get editUI(): DialogBase {
    return this.shadowRoot!.querySelector('mwc-dialog')!;
  }

  saveSubstation(): void {
    console.log(
      'save',
      (<TextField>this.editUI.querySelector('mwc-textfield[label="name"]'))
        .value,
      (<TextField>this.editUI.querySelector('mwc-textfield[label="desc"]'))
        .value
    );
  }

  addSubstation(): void {
    console.log(
      'add',
      (<TextField>this.editUI.querySelector('mwc-textfield[label="name"]'))
        .value,
      (<TextField>this.editUI.querySelector('mwc-textfield[label="desc"]'))
        .value
    );
  }

  render(): TemplateResult {
    if (this.doc)
      return html` <main>
        <h1>${this.name}<mwc-icon-button icon="edit"></mwc-icon-button></h1>
        <h2>${this.desc}<mwc-icon-button icon="edit"></mwc-icon-button></h2>
        <pre>
${this.doc ? new XMLSerializer().serializeToString(this.doc) : null}</pre
        >
        <mwc-dialog heading="Edit Substation">
          <mwc-textfield value="${this.name}" label="name"></mwc-textfield>
          <mwc-textfield value="${this.desc}" label="desc"></mwc-textfield>
          <mwc-button slot="secondaryAction" dialogAction="close">
            Cancel
          </mwc-button>
          <mwc-button
            @click=${this.saveSubstation}
            slot="primaryAction"
            dialogAction="save"
          >
            Save
          </mwc-button>
        </mwc-dialog>
        <mwc-fab @click=${() => (this.editUI.open = true)} icon="edit">
        </mwc-fab>
      </main>`;
    else
      return html`<mwc-fab
          icon="add"
          @click=${() => (this.editUI.open = true)}
        ></mwc-fab>
        <mwc-dialog heading="Add Substation">
          <mwc-textfield label="name" dialogInitialFocus></mwc-textfield>
          <mwc-textfield label="desc"></mwc-textfield>
          <mwc-button slot="secondaryAction" dialogAction="close">
            Cancel
          </mwc-button>
          <mwc-button
            @click=${this.addSubstation}
            slot="primaryAction"
            dialogAction="add"
          >
            Add
          </mwc-button>
        </mwc-dialog>`;
  }
}
