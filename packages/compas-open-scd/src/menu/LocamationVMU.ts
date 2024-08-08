import {LitElement} from 'lit-element';

import {newWizardEvent} from '@openscd/open-scd/src/foundation.js';
import {Nsdoc} from "@openscd/open-scd/src/foundation/nsdoc.js";

import "../locamation/LocamationIEDList.js";

import {locamationIEDListWizard} from "../locamation/LocamationIEDList.js";

export default class LocamationVMUMenuPlugin extends LitElement {
  doc!: XMLDocument;
  nsdoc!: Nsdoc;

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(locamationIEDListWizard(this.doc, this.nsdoc)));
  }
}
