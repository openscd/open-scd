import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get, translate} from "lit-translate";
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";
import {newWizardEvent, Wizard, WizardActor} from '../foundation.js';
import {CompasSclDataService, SDS_NAMESPACE} from "../compas-services/CompasSclDataService.js";
import {listSclsWizard} from "./CompasScl.js";

@customElement('compas-scltype-list')
export class CompasScltypeList extends LitElement {
  @property()
  sclTypes!: Element[];

  firstUpdated() {
    this.fetchData();
  }

  fetchData() {
    CompasSclDataService().listSclTypesAndOrder()
      .then(types => this.sclTypes = types)
  }

  listScls(type: string): void {
    this.dispatchEvent(newWizardEvent(listSclsWizard(type)));
  }

  render(): TemplateResult {
      if (!this.sclTypes) {
        return html `
          <mwc-list>
            <mwc-list-item>${translate("compas.loading")}</mwc-list-item>
          </mwc-list>`
      }

      if (this.sclTypes.length <= 0) {
        return html `
          <mwc-list>
            <mwc-list-item>
              ${translate("compas.open.noSclTypes")}
            </mwc-list-item>
         </mwc-list>`
      }
      return html`
        <mwc-list>
          ${this.sclTypes.map( type => {
              const code = type.getElementsByTagNameNS(SDS_NAMESPACE, "Code").item(0);
              const description = type.getElementsByTagNameNS(SDS_NAMESPACE, "Description").item(0);
              return html`<mwc-list-item
                            @click=${(evt: SingleSelectedEvent) => {
                              evt.target!.dispatchEvent(newWizardEvent());
                              this.listScls(code!.textContent ?? '');
                            }}
                            tabindex="0"
                          >
                            <span>${description} (${code})</span>
                          </mwc-list-item>`;
            })}
        </mwc-list>`
     }
}

export function compasSclTypeListWizardActor(): WizardActor {
  return () => [() => compasSclTypeListWizard()];
}

export function compasSclTypeListWizard(): Wizard {
  return [
    {
      title: get('compas.open.listSclTypes'),
      content: [
        html`<compas-scltype-list/>`,
      ],
    },
  ];
}
