import {
  LitElement,
  customElement,
  property,
  state,
  html,
  query,
  TemplateResult,
} from 'lit-element';

import '../src/addons/Editor.js';
import '../src/addons/History.js';
import { OscdEditor } from '../src/addons/Editor.js';
import { OscdHistory } from '../src/addons/History.js';
import { XMLEditor } from '@openscd/core';

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

  @state()
  xmlEditor = new XMLEditor();

  render(): TemplateResult {
    return html` <oscd-history .host=${this} .editCount=${this.editCount} .editor=${this.xmlEditor}>
      <oscd-editor
        .doc=${this.doc}
        .docName=${this.docName}
        .docId=${this.docId}
        .host=${this}
        .editCount=${this.editCount}
        .editor=${this.xmlEditor}
      >
      </oscd-editor>
    </oscd-history>`;
  }
}
