import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get, translate} from "lit-translate";

import {newPendingStateEvent, newWizardEvent, Wizard} from "../foundation.js";
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";

import {CompasSclDataService, SDS_NAMESPACE} from "../compas-services/CompasSclDataService.js";
import {createLogEvent} from "../compas-services/foundation.js";
import {compasSclTypeListWizardActor} from "./CompasSclTypeList.js";
import {getOpenScdElement, updateDocumentInOpenSCD} from "./foundation.js";

@customElement('compas-scl-list')
export class CompasScl extends LitElement {
  @property({type: String})
  type = '';

  @property()
  scls!: Element[];

  firstUpdated(): void {
    this.fetchData();
  }

  fetchData(): void {
    CompasSclDataService().listScls(this.type)
      .then(xmlResponse => {
        this.scls = Array.from(xmlResponse.querySelectorAll('Item') ?? [])
      });
  }

  openScl(id?: string): void {
    getOpenScdElement().dispatchEvent(newPendingStateEvent(this.getSclDocument(id)));
  }

  private async getSclDocument(id?: string): Promise<void> {
    const response = await CompasSclDataService()
      .getSclDocument(this.type, id ?? '')
      .catch(createLogEvent);

    if (response instanceof Document) {
      // Copy the SCL Result from the Response and create a new Document from it.
      const sclElement = response.querySelectorAll("SCL").item(0);
      const sclDocument = document.implementation.createDocument("", "", null);
      sclDocument.getRootNode().appendChild(sclElement.cloneNode(true));

      updateDocumentInOpenSCD(sclDocument);
    }
  }

  render(): TemplateResult {
    if (!this.scls) {
      return html `
        <compas-loading></compas-loading>
      `
    }
    if (this.scls?.length <= 0) {
      return html `
        <mwc-list>
          <mwc-list-item>${translate("compas.open.noScls")}</mwc-list-item>
        </mwc-list>`
    }
    return html`
      <mwc-list>
        ${this.scls.map( item => {
            const id = item.getElementsByTagNameNS(SDS_NAMESPACE, "Id").item(0)!.textContent ?? '';
            let name = item.getElementsByTagNameNS(SDS_NAMESPACE, "Name").item(0)!.textContent ?? '';
            if (name === '') {
              name = id;
            }
            const version = item.getElementsByTagNameNS(SDS_NAMESPACE, "Version").item(0);
            return html`<mwc-list-item tabindex="0"
                          @click=${(evt: SingleSelectedEvent) => {
                            this.openScl(id);
                            evt.target!.dispatchEvent(newWizardEvent());
                          }}>
                            ${name} (${version})
                        </mwc-list-item>`
          })}
      </mwc-list>`
  }
}

export function listSclsWizard(type: string): Wizard {
  return [
    {
      title: get('compas.open.listScls', {type: type}),
      secondary: {
        icon: '',
        label: get('cancel'),
        action: compasSclTypeListWizardActor(),
      },
      content: [
        html`<compas-scl-list .type="${type}"/>`,
      ],
    },
  ];
}
