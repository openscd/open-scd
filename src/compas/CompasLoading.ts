import {customElement, html, LitElement, TemplateResult} from "lit-element";
import {translate} from "lit-translate";

@customElement('compas-loading')
export class CompasLoadingElement extends LitElement {
  render(): TemplateResult {
    return html`
      <mwc-list>
        <mwc-list-item>${translate("compas.loading")}</mwc-list-item>
      </mwc-list>
    `
  }
}
