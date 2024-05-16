import { LitElement, customElement, property, state, html, query, TemplateResult } from 'lit-element';

import '../src/addons/Editor.js';
import { OscdEditor } from '../src/addons/Editor.js';

@customElement('mock-editor')
export class MockEditor extends LitElement {
  @property({ type: Object }) doc!: XMLDocument;

  @property({ type: String }) docName = 'test';

  @property({ type: String }) docId = 'test';

  @state()
  editCount = -1;


  @query('oscd-editor')
  editor!: OscdEditor;

  render(): TemplateResult {
    return html`
      <oscd-editor
        .doc=${this.doc}
        .docName=${this.docName}
        .docId=${this.docId}
        .host=${this}
        .editCount=${this.editCount}
      >
      </oscd-editor>`;
  }
}
