import { Insert, newEditEvent, Remove, SetAttributes, SetTextContent } from '@openscd/core';
import { LitElement, html, TemplateResult, property, css, state } from 'lit-element';

export default class SubstationPlugin extends LitElement {
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  @state()
  docString: string = '';

  create() {
    const bay2 = this.doc.querySelector('Bay[name="B1"]')!;
    const newLnode = this.doc.createElement('LNode');
    newLnode.setAttribute('desc', 'Create Test');

    const edit: Insert = {
      parent: bay2,
      node: newLnode,
      reference: null
    } 

    const editEvent = newEditEvent(edit)

    this.dispatchEvent(editEvent);

    this.updateDoc();
  }

  delete() {
    const bay2 = this.doc.querySelector('Bay[name="B2"]')!;

    const edit: Remove = {
      node: bay2
    }

    this.dispatchEvent(newEditEvent(edit));

    this.updateDoc();
  }

  setAttribute(): void {
    const bay1 = this.doc.querySelector('Bay[name="B1"]')!;

    const edit: SetAttributes = {
      element: bay1,
      attributes: {
        desc: 'New description'
      },
      attributesNS: {
        nsAttribute: {
          'sxy:x': 'New xmlTest'
        }
      }
    }

    this.dispatchEvent(newEditEvent(edit));

    this.updateDoc();
  }

  setTextcontent(): void {
    const bay1 = this.doc.querySelector('Bay[name="B1"]')!;

    const edit: SetTextContent = {
      element: bay1,
      textContent: 'New text content'
    }

    this.dispatchEvent(newEditEvent(edit));

    this.updateDoc();
  }

  updateDoc() {
    this.docString = new XMLSerializer().serializeToString(this.doc);
  }

  render(): TemplateResult {
    return html`<div class="edit-test">
      <h1>Edit Test</h1>
      <div>
        <mwc-button slot="primaryAction" dialogAction="close" @click=${() => this.create()}>
          Create
        </mwc-button>
        <mwc-button slot="primaryAction" dialogAction="close" @click=${() => this.setAttribute()}>
          Set Attributes
        </mwc-button>
        <mwc-button slot="primaryAction" dialogAction="close" @click=${() => this.setTextcontent()}>
          Set Textcontent
        </mwc-button>
        <mwc-button slot="primaryAction" dialogAction="close" @click=${() => this.delete()}>
          Delete
        </mwc-button>
      </div>
      <div>
        <pre lang="xml" >${this.docString}</pre>
      </div>
    </div>`;
  }

  static styles = css`
    .edit-test {
      margin: 24px;
    }
  `;
}