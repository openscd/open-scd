var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  css,
  customElement,
  html,
  LitElement,
  state
} from "../../../../_snowpack/pkg/lit-element.js";
export let ElementPath = class extends LitElement {
  constructor() {
    super();
    this.elementNames = [];
    const parentSection = this.closest("section");
    if (parentSection) {
      parentSection.addEventListener("full-element-path", (event) => {
        this.elementNames = event.detail.elementNames;
      });
    }
  }
  render() {
    return html`
      <h3>${this.elementNames.join(" / ")}</h3>
    `;
  }
};
ElementPath.styles = css`
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
], ElementPath.prototype, "elementNames", 2);
ElementPath = __decorate([
  customElement("element-path")
], ElementPath);
