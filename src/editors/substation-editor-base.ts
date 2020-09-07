import { LitElement, html, TemplateResult, property, query } from 'lit-element';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-fab';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import { Dialog } from '@material/mwc-dialog';
import { TextField } from '@material/mwc-textfield';
import { newActionEvent } from '../foundation.js';

export class SubstationEditorBase extends LitElement {
  @property()
  get node(): Element | null {
    return this.doc?.querySelector('Substation') ?? null;
  }
  tag = 'Substation';
  @property()
  doc?: XMLDocument;
  @property({ type: String })
  get name(): string {
    return this.node?.getAttribute('name') ?? '';
  }

  @property({ type: String })
  get desc(): string {
    return this.node?.getAttribute('desc') ?? '';
  }

  @query('mwc-dialog') editUI!: Dialog;
  @query('mwc-textfield[label="name"]') nameUI!: TextField;
  @query('mwc-textfield[label="desc"]') descUI!: TextField;
  @query('div#editor') editorPaneUI!: HTMLElement;

  saveSubstation(e: Event): void {
    const dialog = <Dialog>(<HTMLElement>e.target).parentElement!;
    if (
      Array.from(dialog.querySelectorAll('mwc-textfield'))
        .map(tf => tf.checkValidity())
        .reduce((acc, v) => acc && v) &&
      (this.nameUI.value != this.name || this.descUI.value != this.desc)
    ) {
      const newElement = <Element>this.node!.cloneNode(false);
      const event = newActionEvent({
        old: { element: this.node! },
        new: { element: newElement },
      });
      newElement.setAttribute('name', this.nameUI.value);
      newElement.setAttribute('desc', this.descUI.value);
      this.dispatchEvent(event);
      dialog.close();
    }
  }

  addSubstation(e: Event): void {
    const dialog = <Dialog>(<HTMLElement>e.target).parentElement!;
    if (
      Array.from(dialog.querySelectorAll('mwc-textfield'))
        .map(tf => tf.checkValidity())
        .reduce((acc, v) => acc && v)
    ) {
      if (this.nameUI.value == '') return;
      if (this.doc) {
        const event = newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: new DOMParser().parseFromString(
              `<Substation
        name="${this.nameUI.value}"
        desc="${this.descUI.value}"
        ></Substation>`,
              'application/xml'
            ).documentElement,
          },
        });
        this.dispatchEvent(event);
      }
      dialog.close();
    }
  }

  render(): TemplateResult {
    if (this.node)
      return html`
        <div id="editor">
          <h1>${this.name}<mwc-icon-button icon="edit"></mwc-icon-button></h1>
          <h2>${this.desc}<mwc-icon-button icon="edit"></mwc-icon-button></h2>
          <pre>
${this.node ? new XMLSerializer().serializeToString(this.node) : null}</pre
          >
        </div>
        <mwc-dialog heading="Edit Substation">
          <mwc-textfield
            value="${this.name ?? ''}"
            label="name"
            required
            dialogInitialFocus
          ></mwc-textfield>
          <mwc-textfield
            value="${this.desc ?? ''}"
            label="desc"
          ></mwc-textfield>
          <mwc-button slot="secondaryAction" dialogAction="close">
            Cancel
          </mwc-button>
          <mwc-button @click=${this.saveSubstation} slot="primaryAction">
            Save
          </mwc-button>
        </mwc-dialog>
        <mwc-fab @click=${() => (this.editUI.open = true)} icon="edit">
        </mwc-fab>
      `;
    else
      return html`<div id="editor"></div>
        <mwc-fab icon="add" @click=${() => (this.editUI.open = true)}></mwc-fab>
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
