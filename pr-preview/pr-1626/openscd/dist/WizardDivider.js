import { __decorate } from "../../_snowpack/pkg/tslib.js";
import { css, customElement, html, LitElement, property, } from '../../_snowpack/pkg/lit-element.js';
let WizardDividerElement = class WizardDividerElement extends LitElement {
    render() {
        return html ` ${this.renderHeader()} ${this.renderSeparator()}`;
    }
    renderHeader() {
        if (!this.header) {
            return html ``;
        }
        return html `<h4 class="header">${this.header}</h4>`;
    }
    renderSeparator() {
        return html `<div role="separator"></div>`;
    }
};
WizardDividerElement.styles = css `
    div {
      height: 0px;
      margin: 10px 0px 10px 0px;
      border-top: none;
      border-right: none;
      border-left: none;
      border-image: initial;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
  `;
__decorate([
    property({
        type: String,
    })
], WizardDividerElement.prototype, "header", void 0);
WizardDividerElement = __decorate([
    customElement('wizard-divider')
], WizardDividerElement);
export { WizardDividerElement };
//# sourceMappingURL=WizardDivider.js.map