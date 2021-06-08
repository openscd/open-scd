import {LitElement, property} from 'lit-element';
import {newWizardEvent} from '../foundation.js';
import {saveToCompasWizard} from "../compas/CompasSaveTo.js";

export default class SaveCompasPlugin extends LitElement {
  doc!: XMLDocument;
  docName!: string;
  docId!: string;
  docType!: string;

  async trigger(): Promise<void> {
    this.dispatchEvent(newWizardEvent(saveToCompasWizard(this.doc, this.docName, this.docId, this.docType)));
  }
}

