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
} from "../../../_snowpack/pkg/lit-element.js";
export let OscdTooltip = class extends LitElement {
  constructor() {
    super(...arguments);
    this.text = "";
    this.visible = false;
    this.x = 0;
    this.y = 0;
    this.offset = 12;
    this.pendingFrame = 0;
  }
  show(text, clientX, clientY) {
    this.text = text;
    this.visible = true;
    this.updatePosition(clientX, clientY);
  }
  hide() {
    this.visible = false;
    this.text = "";
    if (this.pendingFrame) {
      cancelAnimationFrame(this.pendingFrame);
      this.pendingFrame = 0;
    }
  }
  updatePosition(clientX, clientY) {
    this.x = clientX + this.offset;
    this.y = clientY + this.offset;
    if (this.pendingFrame)
      return;
    this.pendingFrame = requestAnimationFrame(() => {
      this.pendingFrame = 0;
      if (!this.visible)
        return;
      const tipRect = this.getBoundingClientRect();
      let x = this.x;
      let y = this.y;
      const innerW = window.innerWidth;
      const innerH = window.innerHeight;
      if (x + tipRect.width + this.offset > innerW) {
        x = this.x - this.offset - tipRect.width - this.offset;
      }
      if (x < this.offset)
        x = this.offset;
      if (y + tipRect.height + this.offset > innerH) {
        y = this.y - this.offset - tipRect.height - this.offset;
      }
      if (y < this.offset)
        y = this.offset;
      this.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    });
  }
  render() {
    return html`<slot>${this.text}</slot>`;
  }
};
OscdTooltip.styles = css`
    :host {
      position: fixed;
      pointer-events: none;
      background: rgba(20, 20, 20, 0.95);
      color: rgba(240, 240, 240, 0.98);
      padding: 6px 8px;
      border-radius: 4px;
      font-size: 0.85em;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
      z-index: 6000;
      max-width: 60vw;
      border: 1px solid rgba(255, 255, 255, 0.04);
      left: 0;
      top: 0;
      transform: translate3d(0, 0, 0);
      will-change: transform;
      opacity: 1;
      transition: opacity 0.15s ease-in-out;
    }

    :host(:not([visible])) {
      opacity: 0;
      pointer-events: none;
    }

    :host([hidden]) {
      display: none;
    }
  `;
__decorate([
  property({type: String})
], OscdTooltip.prototype, "text", 2);
__decorate([
  property({type: Boolean, reflect: true})
], OscdTooltip.prototype, "visible", 2);
__decorate([
  property({type: Number})
], OscdTooltip.prototype, "x", 2);
__decorate([
  property({type: Number})
], OscdTooltip.prototype, "y", 2);
__decorate([
  property({type: Number})
], OscdTooltip.prototype, "offset", 2);
OscdTooltip = __decorate([
  customElement("oscd-tooltip-4c6027dd")
], OscdTooltip);
