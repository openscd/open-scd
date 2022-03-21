import {customElement, html, LitElement, TemplateResult} from "lit-element";
import {ListItemBase} from "@material/mwc-list/mwc-list-item-base";
import {translate} from "lit-translate";

import '@material/mwc-list';
import '@material/mwc-list/mwc-radio-list-item';

import {ChangeSet} from "../compas-services/CompasSclDataService.js";

type ChangeSetDetail = {
  translationKey: string
}
const changeSetDetails = new Map<ChangeSet, ChangeSetDetail>([
  [ChangeSet.MAJOR, {translationKey: 'compas.changeset.major'}],
  [ChangeSet.MINOR, {translationKey: 'compas.changeset.minor'}],
  [ChangeSet.PATCH, {translationKey: 'compas.changeset.patch'}]
])

@customElement('compas-changeset-radiogroup')
export class CompasChangeSetRadiogroup extends LitElement {
  private getSelectedListItem() : ListItemBase | null {
    return <ListItemBase>this.shadowRoot!.querySelector('mwc-list')!.selected;
  }

  getSelectedValue() : ChangeSet | null {
    const changeSet = this.getSelectedListItem();
    if (changeSet) {
      return <ChangeSet>changeSet.value;
    }
    return null;
  }

  valid(): boolean {
    return this.getSelectedListItem() !== null;
  }

  render(): TemplateResult {
    return html`
      <mwc-list activatable>
        ${Object.values(ChangeSet)
                .map((key) =>
                  html `<mwc-radio-list-item value="${key}" left>
                          ${translate(changeSetDetails.get(key)!.translationKey)}
                        </mwc-radio-list-item>`
                )}
      </mwc-list>
    `
  }
}
