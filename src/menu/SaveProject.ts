import { LitElement, property } from 'lit-element';

import {saveDocumentToFile} from "../file.js";

export default class SaveProjectPlugin extends LitElement {
  @property() doc!: XMLDocument;
  @property() docName!: string;

  async run(): Promise<void> {
    saveDocumentToFile(this.doc, this.docName);
  }
}
