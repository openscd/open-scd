import {customElement, html, LitElement, TemplateResult} from "lit-element";
import {ListItemBase} from "@material/mwc-list/mwc-list-item-base";

@customElement('compas-changeset-radiogroup')
export class CompasChangeSetRadiogroup extends LitElement {
  render(): TemplateResult {
    return html`
      <mwc-list activatable>
        <mwc-radio-list-item value="MAJOR" left>Major change</mwc-radio-list-item>
        <mwc-radio-list-item value="MINOR" left>Minor change</mwc-radio-list-item>
        <mwc-radio-list-item value="PATCH" selected left>Patch change</mwc-radio-list-item>
      </mwc-list>
    `
  }

  getSelectedValue() : string {
    return (<ListItemBase>this.shadowRoot!.querySelector('mwc-list')!.selected).value;
  }
}
