import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get} from "lit-translate";
import {CompasSclDataService} from "./CompasSclDataService.js";
import {ListItemBase} from "@material/mwc-list/mwc-list-item-base";

@customElement('compas-scltype-radiogroup')
export class CompasScltypeRadiogroup extends LitElement {
  @property({type: String})
  value = '';

  @property({type: Document})
  sclTypes!:Element[];

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    CompasSclDataService().listSclTypesAndOrder()
      .then(types => this.sclTypes = types)
  }

  private getSelectedListItem() : ListItemBase | null {
    return <ListItemBase>this.shadowRoot!.querySelector('mwc-list')!.selected;
  }

  getSelectedValue() : string | null {
    const listItem = this.getSelectedListItem();
    if (listItem) {
      return listItem.value;
    }
    return null;
  }

  valid(): boolean {
    return this.getSelectedListItem() !== null;
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
          const code = type.getElementsByTagName("Code").item(0)!.textContent ?? '';
          const description = type.getElementsByTagName("Description").item(0);
          const selected = (code.toLowerCase() === this.value.toLowerCase());
          return html`<mwc-radio-list-item value="${code ?? ''}" ?selected="${selected}" left>
                              <span>${description} (${code})</span>
                      </mwc-radio-list-item>`;
        })}
      </mwc-list>`
  }
}
