import {customElement, html, LitElement, TemplateResult} from "lit-element";
import {ListItemBase} from "@material/mwc-list/mwc-list-item-base";

export enum ChangeSet {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  PATCH = "PATCH",
}
type ChangeSetDetail = {
  description: string
}
const changeSetDetails = new Map<ChangeSet, ChangeSetDetail>([
  [ChangeSet.MAJOR, {description: "Major change"}],
  [ChangeSet.MINOR, {description: "Minor change"}],
  [ChangeSet.PATCH, {description: "Patch change"}]
])

@customElement('compas-changeset-radiogroup')
export class CompasChangeSetRadiogroup extends LitElement {
  render(): TemplateResult {
    return html`
      <mwc-list activatable>
        ${Object.values(ChangeSet)
          .map((key) => html `<mwc-radio-list-item value="${key}" left>${changeSetDetails.get(key)!.description}</mwc-radio-list-item>`)}
      </mwc-list>
    `
  }

  getSelectedValue() : ChangeSet {
    return <ChangeSet>(<ListItemBase>this.shadowRoot!.querySelector('mwc-list')!.selected).value;
  }
}
