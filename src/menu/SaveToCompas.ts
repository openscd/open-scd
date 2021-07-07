import {LitElement} from 'lit-element';
import {newWizardEvent} from '../foundation.js';
import {saveToCompasWizard} from "../compas/CompasSaveTo.js";

export default class SaveCompasPlugin extends LitElement {
  doc!: XMLDocument;
  docId!: string;
  docName!: string;

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(saveToCompasWizard(this.doc, {docId: this.docId, docName: this.docName})));
  }
}

