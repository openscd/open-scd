import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {ListItemBase} from "@material/mwc-list/mwc-list-item-base";
import {translate} from "lit-translate";

import {CompasSclDataService, SDS_NAMESPACE} from "../compas-services/CompasSclDataService.js";

@customElement('compas-scltype-radiogroup')
export class CompasSclTypeRadiogroup extends LitElement {
  @property({type: String})
  value = '';

  @property({type: Document})
  sclTypes!:Element[];

  firstUpdated(): void {
    this.fetchData();
  }

  fetchData(): void {
    CompasSclDataService().listSclTypesAndOrder()
      .then(types => this.sclTypes = types);
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
      return html `
        <compas-loading></compas-loading>
      `
    }

    if (this.sclTypes.length <= 0) {
      return html `
        <mwc-list>
          <mwc-list-item><i>${translate("compas.noSclTypes")}</i></mwc-list-item>
       </mwc-list>`
    }
    return html`
      <mwc-list activatable>
        ${this.sclTypes.map( type => {
          const code = type.getElementsByTagNameNS(SDS_NAMESPACE, "Code").item(0)!.textContent ?? '';
          const description = type.getElementsByTagNameNS(SDS_NAMESPACE, "Description").item(0)!.textContent ?? '';
          return html`<mwc-radio-list-item value="${code}" ?selected="${(code === this.value)}" left>
                              <span>${description} (${code})</span>
                      </mwc-radio-list-item>`;
        })}
      </mwc-list>`
  }
}
