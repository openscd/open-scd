import { __decorate } from "tslib";
import { css, customElement, html, LitElement, state, } from 'lit-element';
let ElementPath = class ElementPath extends LitElement {
    constructor() {
        super();
        this.elementNames = [];
        const parentSection = this.closest('section');
        if (parentSection) {
            parentSection.addEventListener('full-element-path', (event) => {
                this.elementNames = event.detail.elementNames;
            });
        }
    }
    render() {
        return html `
      <h3>${this.elementNames.join(' / ')}</h3>
    `;
    }
};
ElementPath.styles = css `
    h3 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }`;
__decorate([
    state()
], ElementPath.prototype, "elementNames", void 0);
ElementPath = __decorate([
    customElement('element-path')
], ElementPath);
export { ElementPath };
//# sourceMappingURL=element-path.js.map