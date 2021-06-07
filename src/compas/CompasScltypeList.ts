import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get} from "lit-translate";
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";
import {newWizardEvent, Wizard} from '../foundation.js';
import {openlListCompasWizard} from "../triggered/OpenCompas.js";
import {listSclTypes} from "./CompasService.js";
import './CompasSclList.ts';

@customElement('compas-scltype-list')
export class CompasSclTypeList extends LitElement {
  @property({type: Document})
  sclTypes: Document | undefined;

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    listSclTypes()
      .then(sclTypes => { this.sclTypes = sclTypes;})
  }

  listScls(code: string): void {
    this.dispatchEvent(newWizardEvent(listSclsWizard(code)));
  }

  render(): TemplateResult {
      if (!this.sclTypes) {
        return html `<mwc-list><mwc-list-item>Loading...</mwc-list-item></mwc-list>`
      }
      const types = Array.from(this.sclTypes.querySelectorAll('Type') ?? []);
      if (types?.length <= 0) {
        return html `<mwc-list>
                        <mwc-list-item>
                          ${get("compas.open.noSclTypes")}
                        </mwc-list-item>
                     </mwc-list>`
      }
      return html`
          <mwc-list>
            ${types.map( type => {
                const code = type.getElementsByTagName("Code").item(0);
                const description = type.getElementsByTagName("Description").item(0);
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

function listSclsWizard(code: string): Wizard {
  return [
    {
      title: get('compas.open.listScls', {code: code}),
      secondary: {
        icon: '',
        label: get('cancel'),
        action: openlListCompasWizard(),
      },
      content: [
        html`<compas-scl-list .code="${code}"/>`,
      ],
    },
  ];
}
