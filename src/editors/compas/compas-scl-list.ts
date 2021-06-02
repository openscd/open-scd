import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {newLogEvent, newOpenDocEvent, newPendingStateEvent, newWizardEvent} from "../../foundation.js";
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";
import {string} from "fast-check";
import {Validating} from "../../Validating.js";
import {get} from "lit-translate";

@customElement('compas-scl-list')
export class CompasSclListEditor extends Validating(LitElement) {
  @property({type: String})
  code: string | undefined;

  @property({type: Document})
  scls: Document | undefined;

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    fetch('http://localhost:8080/scl/v1/' + this.code + '/list')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'))
      .then(scls => { this.scls = scls;})
  }

  openScl(id?: string) {
    this.dispatchEvent(newPendingStateEvent(this.loadDoc(id)));
  }

  private async loadDoc(id?: string): Promise<void> {
    const sclUrl = 'http://localhost:8080/scl/v1/' + this.code + '/' + id + '/scl';
    const doc = await fetch(sclUrl)
                        .then(response => response.text())
                        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
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
