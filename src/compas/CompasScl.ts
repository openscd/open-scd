import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get} from "lit-translate";

import {newPendingStateEvent, newWizardEvent, Wizard} from "../foundation.js";
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";

import {CompasSclDataService} from "./CompasSclDataService.js";
import {compasSclTypeListWizardActor} from "./CompasScltypeList.js";
import {updateDocumentInOpenSCD} from "./foundation.js";

@customElement('compas-scl-list')
export class CompasScl extends LitElement {
  @property({type: String})
  type = '';

  @property()
  scls!: Element[];

  firstUpdated() {
    CompasSclDataService().listScls(this.type)
      .then(xmlResponse => {
        this.scls = Array.from(xmlResponse.querySelectorAll('Item') ?? [])
      })
  }

  openScl(id?: string) {
    this.dispatchEvent(newPendingStateEvent(this.getSclDocument(id)));
  }

  private async getSclDocument(id?: string): Promise<void> {
    const doc = await CompasSclDataService().getSclDocument(this.type, id ?? '');
    updateDocumentInOpenSCD(doc);
  }

  render(): TemplateResult {
    if (!this.scls) {
      return html `<mwc-list><mwc-list-item>Loading...</mwc-list-item></mwc-list>`
    }
    if (this.scls?.length <= 0) {
      return html `<mwc-list>
                        <mwc-list-item>
                          ${get("compas.open.noScls")}
                        </mwc-list-item>
                     </mwc-list>`
    }
    return html`
          <mwc-list>
            ${this.scls.map( item => {
                const id = item.getElementsByTagName("Id").item(0)!.textContent ?? '';
                let name = item.getElementsByTagName("Name").item(0)!.textContent ?? '';
                if (name === '') {
                  name = id;
                }
                const version = item.getElementsByTagName("Version").item(0);
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
