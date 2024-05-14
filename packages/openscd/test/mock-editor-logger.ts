import { LitElement, customElement, property, state, html, query, TemplateResult } from 'lit-element';

import '../src/addons/Editor.js';
import '../src/addons/History.js';
import { OscdEditor } from '../src/addons/Editor.js';
import { UndoRedoChangedEvent, OscdHistory } from '../src/addons/History.js';

@customElement('mock-editor-logger')
export class MockEditorLogger extends LitElement {
  @property({ type: Object }) doc!: XMLDocument;

  @property({ type: String }) docName = 'test';

  @property({ type: String }) docId = 'test';

  @state()
  editCount = -1;

  @query('oscd-history')
  history!: OscdHistory;

  @query('oscd-editor')
  editor!: OscdEditor;

  render(): TemplateResult {
    return html`
        <oscd-history 
            .host=${this} 
            @undo-redo-changed="${(e:UndoRedoChangedEvent) => { this.editCount = e.detail.editCount }}"
          >
            <oscd-editor
              .doc=${this.doc}
              .docName=${this.docName}
              .docId=${this.docId}
              .host=${this}
              .editCount=${this.editCount}
            >

            </oscd-editor>
          </oscd-history>`;
  }
}
