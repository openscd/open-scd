import {
  LitElement,
  html,
  TemplateResult,
  internalProperty,
  property,
  query,
} from 'lit-element';

import '@material/mwc-dialog';
import '@material/mwc-fab';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base';
import { TextField } from '@material/mwc-textfield';

export interface EditDetail {
  name?: string;
  desc?: string;
}

export interface AddDetail {
  name: string;
  desc?: string;
}

export class SubstationEditorBase extends LitElement {
  @internalProperty()
  doc: Readonly<Element> | null = null;

  @property({ type: String })
  get name(): string | null {
    return this.doc?.getAttribute('name') ?? null;
  }

  @property({ type: String })
  get desc(): string | null {
    return this.doc?.getAttribute('desc') ?? null;
  }

  @query('mwc-dialog') editUI!: DialogBase;
  @query('mwc-textfield[label="name"]') nameUI!: TextField;
  @query('mwc-textfield[label="desc"]') descUI!: TextField;

  saveSubstation(e: Event): void {
    const dialog = <DialogBase>(<HTMLElement>e.target).parentElement!;
    if (
      Array.from(dialog.querySelectorAll('mwc-textfield'))
        .map(tf => tf.checkValidity())
        .reduce((acc, v) => acc && v)
    ) {
      const event = new CustomEvent<EditDetail>('edit', {
        composed: true,
        bubbles: true,
        detail: {},
      });
      if (this.nameUI.value != this.name) event.detail.name = this.nameUI.value;
      if (this.descUI.value != this.desc) event.detail.desc = this.descUI.value;
      this.dispatchEvent(event);
      dialog.close();
    }
  }

  addSubstation(e: Event): void {
    const dialog = <DialogBase>(<HTMLElement>e.target).parentElement!;
    if (
      Array.from(dialog.querySelectorAll('mwc-textfield'))
        .map(tf => tf.checkValidity())
        .reduce((acc, v) => acc && v)
    ) {
      if (this.nameUI.value == '') return;
      const event = new CustomEvent<AddDetail>('add', {
        composed: true,
        bubbles: true,
        detail: { name: this.nameUI.value },
      });
      if (this.descUI.value != this.desc) event.detail.desc = this.descUI.value;
      this.dispatchEvent(event);
      dialog.close();
    }
  }

  render(): TemplateResult {
    if (this.doc)
      return html` <div id="editor">
        <h1>${this.name}<mwc-icon-button icon="edit"></mwc-icon-button></h1>
        <h2>${this.desc}<mwc-icon-button icon="edit"></mwc-icon-button></h2>
        <pre>
${this.doc ? new XMLSerializer().serializeToString(this.doc) : null}</pre
        >
        <mwc-dialog heading="Edit Substation">
          <mwc-textfield
            value="${this.name}"
            label="name"
            required
          ></mwc-textfield>
          <mwc-textfield value="${this.desc}" label="desc"></mwc-textfield>
          <mwc-button slot="secondaryAction" dialogAction="close">
            Cancel
          </mwc-button>
          <mwc-button @click=${this.saveSubstation} slot="primaryAction">
            Save
          </mwc-button>
        </mwc-dialog>
        <mwc-fab @click=${() => (this.editUI.open = true)} icon="edit">
        </mwc-fab>
      </div>`;
    else
      return html`<mwc-fab
          icon="add"
          @click=${() => (this.editUI.open = true)}
        ></mwc-fab>
        <mwc-dialog heading="Add Substation">
          <mwc-textfield
            label="name"
            required
            dialogInitialFocus
          ></mwc-textfield>
          <mwc-textfield label="desc"></mwc-textfield>
          <mwc-button slot="secondaryAction" dialogAction="close">
            Cancel
          </mwc-button>
          <mwc-button @click=${this.addSubstation} slot="primaryAction">
            Add
          </mwc-button>
        </mwc-dialog>`;
  }
}
