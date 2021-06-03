import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get} from "lit-translate";
import {newOpenDocEvent, newPendingStateEvent, newWizardEvent} from "../foundation.js";
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";
import {Validating} from "../Validating.js";
import {getSclDocument, listScls} from "./CompasService.js";

@customElement('compas-scl-list')
export class CompasSclListEditor extends Validating(LitElement) {
  @property({type: String})
  code = '';

  @property({type: Document})
  scls: Document | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    listScls(this.code)
      .then(scls => { this.scls = scls;})
  }

  openScl(id?: string) {
    this.dispatchEvent(newPendingStateEvent(this.getSclDocument(id)));
  }

  private async getSclDocument(id?: string): Promise<void> {
    const doc = await getSclDocument(this.code, id ?? '');
    const docName = id + "." + this.code?.toLowerCase();

    document
      .querySelector('open-scd')!
      .dispatchEvent(newOpenDocEvent(doc, docName, {detail: {docId: id}}));
  }

  render(): TemplateResult {
    if (!this.scls) {
      return html `<mwc-list><mwc-list-item>Loading...</mwc-list-item></mwc-list>`
    }
    const scls = Array.from(this.scls.querySelectorAll('Item') ?? []);
    if (scls?.length <= 0) {
      return html `<mwc-list>
                        <mwc-list-item>
                          ${get("compas.open.noScls")}
                        </mwc-list-item>
                     </mwc-list>`
    }
    return html`
          <mwc-list>
            ${scls.map( item => {
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
