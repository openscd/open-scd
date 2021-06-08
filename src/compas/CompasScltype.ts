import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get} from "lit-translate";
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";
import {newWizardEvent, Wizard, WizardActor} from '../foundation.js';
import {listSclTypes} from "./CompasService.js";
import {listSclsWizard} from "./CompasScl.js";
import {ListItemBase} from "@material/mwc-list/mwc-list-item-base";

@customElement('compas-scltype-list')
export class CompasScltypeList extends LitElement {
  @property({type: Document})
  sclTypes!: Element[];

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    listSclTypesAndOrder()
      .then(types => this.sclTypes = types)
  }

  listScls(type: string): void {
    this.dispatchEvent(newWizardEvent(listSclsWizard(type)));
  }

  render(): TemplateResult {
      if (!this.sclTypes) {
        return html `<mwc-list><mwc-list-item>Loading...</mwc-list-item></mwc-list>`
      }

      if (this.sclTypes.length <= 0) {
        return html `<mwc-list>
                        <mwc-list-item>
                          ${get("compas.open.noSclTypes")}
                        </mwc-list-item>
                     </mwc-list>`
      }
      return html`
          <mwc-list>
            ${this.sclTypes.map( type => {
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

@customElement('compas-scltype-radiogroup')
export class CompasScltypeRadiogroup extends LitElement {
  @property({type: Document})
  sclTypes!:Element[];

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    listSclTypesAndOrder()
      .then(types => this.sclTypes = types)
  }

  getSelectedValue() : string {
    return (<ListItemBase>this.shadowRoot!.querySelector('mwc-list')!.selected).value;
  }

  render(): TemplateResult {
    if (!this.sclTypes) {
      return html `<mwc-list><mwc-list-item>Loading...</mwc-list-item></mwc-list>`
    }

    if (this.sclTypes.length <= 0) {
      return html `<mwc-list>
                      <mwc-list-item>
                        ${get("compas.open.noSclTypes")}
                      </mwc-list-item>
                   </mwc-list>`
    }
    return html`
      <mwc-list activatable>
        ${this.sclTypes.map( type => {
      const code = type.getElementsByTagName("Code").item(0);
      const description = type.getElementsByTagName("Description").item(0);
      return html`<mwc-radio-list-item value="${code!.textContent ?? ''}" left>
                              <span>${description} (${code})</span>
                      </mwc-radio-list-item>`;
    })}
      </mwc-list>`
  }
}

function listSclTypesAndOrder(): Promise<Element[]> {
  return listSclTypes()
    .then(sclTypesDocument => {
      return Array.from(sclTypesDocument.querySelectorAll('Type') ?? [])
        .sort((type1, type2) => {
          const description1 = type1.getElementsByTagName("Description")!.item(0)!.textContent ?? "";
          const description2 = type2.getElementsByTagName("Description")!.item(0)!.textContent ?? "";
          return description1.localeCompare(description2)
        });
    })
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
