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
  property
} from "../../_snowpack/pkg/lit-element.js";
import {classMap} from "../../_snowpack/pkg/lit-html/directives/class-map.js";
import "../../_snowpack/pkg/@material/mwc-icon.js";
import {nothing} from "../../_snowpack/pkg/lit-html.js";
function closestTo(node, selector) {
  const closest = node.nodeType === Node.ELEMENT_NODE ? node.closest(selector) : null;
  if (closest)
    return closest;
  const root = node.getRootNode();
  if (root instanceof ShadowRoot)
    return closestTo(root.host, selector);
  return null;
}
export let ActionPane = class extends LitElement {
  constructor() {
    super(...arguments);
    this.secondary = false;
    this.highlighted = false;
    this.level = 1;
  }
  async firstUpdated() {
    this.tabIndex = 0;
    const parentPane = closestTo(this.parentNode, "action-pane");
    if (parentPane)
      this.level = parentPane.level + 1;
    this.level = Math.floor(this.level);
  }
  renderHeader() {
    const content = html`<span
        ><slot name="icon"
          >${this.icon ? html`<mwc-icon>${this.icon}</mwc-icon>` : nothing}</slot
        ></span
      >
      ${this.label ?? nothing}
      <nav><slot name="action"></slot></nav>`;
    const headingLevel = Math.floor(Math.max(this.level, 1));
    const title = typeof this.label === "string" ? this.label : "";
    switch (headingLevel) {
      case 1:
        return html`<h1 title="${title}">${content}</h1>`;
      case 2:
        return html`<h2 title="${title}">${content}</h2>`;
      case 3:
        return html`<h3 title="${title}">${content}</h3>`;
      default:
        return html`<h4 title="${title}">${content}</h4>`;
    }
  }
  render() {
    return html`<section
      class="${classMap({
      secondary: this.secondary,
      highlighted: this.highlighted,
      contrasted: this.level % 2 === 0
    })}"
    >
      ${this.renderHeader()}
      <div><slot></slot></div>
    </section>`;
  }
};
ActionPane.styles = css`
    :host {
      outline: none;
    }

    :host(:focus-within) section {
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
      outline-width: 4px;
      transition: all 250ms linear;
    }

    section {
      background-color: var(--mdc-theme-surface);
      transition: all 200ms linear;
      outline-style: solid;
      margin: 0px;
      outline-width: 0px;
      outline-color: var(--mdc-theme-primary);
    }

    section.secondary {
      outline-color: var(--mdc-theme-secondary);
    }

    section > div {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 12px 16px;
      clear: right;
    }

    .highlighted {
      outline-style: dotted;
      outline-width: 2px;
    }

    :host(:focus-within) .highlighted {
      outline-style: solid;
    }

    .contrasted {
      background-color: var(--mdc-theme-on-primary);
    }

    h1,
    h2,
    h3,
    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: clip visible;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 52px;
      padding-left: 0.3em;
    }

    nav {
      float: right;
    }

    mwc-icon {
      vertical-align: middle;
      position: relative;
      top: -0.1em;
      --mdc-icon-size: 1em;
    }

    ::slotted([slot='icon']) {
      vertical-align: middle;
      position: relative;
      top: -0.1em;
      --mdc-icon-size: 1em;
    }
  `;
__decorate([
  property({type: String})
], ActionPane.prototype, "label", 2);
__decorate([
  property({type: String})
], ActionPane.prototype, "icon", 2);
__decorate([
  property({type: Boolean})
], ActionPane.prototype, "secondary", 2);
__decorate([
  property({type: Boolean})
], ActionPane.prototype, "highlighted", 2);
__decorate([
  property({type: Number})
], ActionPane.prototype, "level", 2);
ActionPane = __decorate([
  customElement("action-pane")
], ActionPane);
