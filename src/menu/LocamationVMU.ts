import {LitElement} from 'lit-element';

import {newWizardEvent} from '../foundation.js';
import {Nsdoc} from "../foundation/nsdoc.js";

import "../locamation/LocamationIEDList.js";

import {locamationIEDListWizard} from "../locamation/LocamationIEDList.js";

export default class LocamationVMUMenuPlugin extends LitElement {
  doc!: XMLDocument;
  nsdoc!: Nsdoc;

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(locamationIEDListWizard(this.doc, this.nsdoc)));
  }
}
