import {customElement, html, LitElement, TemplateResult} from "lit-element";
import {translate} from "lit-translate";

import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

@customElement('compas-loading')
export class CompasLoadingElement extends LitElement {
  render(): TemplateResult {
    return html`
      <mwc-list>
        <mwc-list-item><i>${translate("compas.loading")}</i></mwc-list-item>
      </mwc-list>
    `
  }
}
