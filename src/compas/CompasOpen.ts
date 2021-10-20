import {customElement, html, LitElement, property, TemplateResult} from "lit-element";

import {newPendingStateEvent, newWizardEvent} from "../foundation.js";

import {CompasSclDataService} from "../compas-services/CompasSclDataService.js";
import {createLogEvent} from "../compas-services/foundation.js";
import {getOpenScdElement} from "./foundation.js";
import {SclSelectedEvent} from "./CompasScl.js";
import {TypeSelectedEvent} from "./CompasSclTypeList.js";

import './CompasSclTypeList.js';
import './CompasScl.js';
import {translate} from "lit-translate";

/* Event that will be used when a SCL Document is retrieved. */
export interface DocRetrievedDetail {
  element: Element,
  doc: Document
}
export type DocRetrievedEvent = CustomEvent<DocRetrievedDetail>;
export function newDocRetrievedEvent(
  element: Element,
  doc: Document
): DocRetrievedEvent {
  return new CustomEvent<DocRetrievedDetail>('docRetrieved', {
    bubbles: true,
    composed: true,
    detail: { element, doc },
  });
}

@customElement('open-compas')
export default class CompasOpenElement extends LitElement {
  @property()
  selectedType: string | undefined;

  retrieveSclDocument(id?: string): void {
    getOpenScdElement().dispatchEvent(newPendingStateEvent(this.getSclDocument(id)));
  }

  private async getSclDocument(id?: string): Promise<void> {
    const sclDocument = await CompasSclDataService()
      .getSclDocument(this.selectedType ?? '', id ?? '')
      .catch(createLogEvent);
    if (sclDocument instanceof Document) {
      this.dispatchEvent(newDocRetrievedEvent(this, sclDocument));
    }
  }

  cancel(): void {
    if (this.selectedType) {
      this.selectedType = undefined;
    } else {
      this.dispatchEvent(newWizardEvent());
    }
  }

  render(): TemplateResult {
    if (this.selectedType) {
      return html `
        <h3>${translate('compas.open.listScls', {type: this.selectedType})}</h3>
        <compas-scl-list .type=${this.selectedType}
                         @sclSelected=${(evt: SclSelectedEvent) =>
                           this.retrieveSclDocument(evt.detail.docId)}/>
      `
    }
    return html `
      <h3>${translate('compas.open.listSclTypes')}</h3>
      <compas-scltype-list @typeSelected=${(evt: TypeSelectedEvent) =>
                             this.selectedType = evt.detail.type}/>
    `
  }
}
