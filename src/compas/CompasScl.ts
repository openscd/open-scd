import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get} from "lit-translate";
import {newOpenDocEvent, newPendingStateEvent, newWizardEvent, Wizard} from "../foundation.js";
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";
import {getSclDocument, listScls} from "./CompasService.js";
import {compasSclTypeListWizardActor} from "./CompasScltype.js";

@customElement('compas-scl-list')
export class CompasScl extends LitElement {
  @property({type: String})
  type = '';

  @property()
  scls!: Element[];

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    listScls(this.type)
      .then(scls => { this.scls = Array.from(scls.querySelectorAll('Item') ?? [])})
  }

  openScl(id?: string) {
    this.dispatchEvent(newPendingStateEvent(this.getSclDocument(id)));
  }

  private async getSclDocument(id?: string): Promise<void> {
    const doc = await getSclDocument(this.type, id ?? '');
    const docName = id + "." + this.type?.toLowerCase();

    document
      .querySelector('open-scd')!
      .dispatchEvent(newOpenDocEvent(doc, docName, {detail: {docId: id, docType: this.type?.toLowerCase()}}));
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
                const id = item.getElementsByTagName("Id").item(0);
                const version = item.getElementsByTagName("Version").item(0);
                return html`<mwc-list-item tabindex="0"
                              @click=${(evt: SingleSelectedEvent) => {
                                this.openScl(id!.textContent ?? '');
                                evt.target!.dispatchEvent(newWizardEvent());
                              }}>
                                ${id} (${version})
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
