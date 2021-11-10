import { css, html, LitElement, property, query, TemplateResult } from "lit-element";
import panzoom from "panzoom";

export default class SingleLineDiagramPlugin extends LitElement {
    @property()
    doc!: XMLDocument;

    @query('#panzoom') container!: HTMLElement;
  
    firstUpdated(): void {
      panzoom(this.container);
    }

    render(): TemplateResult {
        return html`<div>
            <div id="panzoom">
                <svg xmlns="http://www.w3.org/2000/svg"
                    id="svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100">
                </svg>
            </div>
        </div>`;
    }

    static styles = css``;
}
