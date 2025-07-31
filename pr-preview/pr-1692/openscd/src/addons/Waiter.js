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
  customElement,
  html,
  LitElement,
  property
} from "../../../_snowpack/pkg/lit-element.js";
import "../../../_snowpack/pkg/@material/mwc-linear-progress.js";
export let OscdWaiter = class extends LitElement {
  constructor() {
    super();
    this.waiting = false;
    this.work = new Set();
    this.workDone = Promise.allSettled(this.work);
    this.onPendingState = this.onPendingState.bind(this);
  }
  async onPendingState(e) {
    this.waiting = true;
    this.work.add(e.detail.promise);
    this.workDone = Promise.allSettled(this.work);
    await e.detail.promise.catch((reason) => console.warn(reason));
    this.work.delete(e.detail.promise);
    this.waiting = this.work.size > 0;
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("pending-state", this.onPendingState);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("pending-state", this.onPendingState);
  }
  render() {
    return html`<slot></slot>
      <mwc-linear-progress
        .closed=${!this.waiting}
        indeterminate
      ></mwc-linear-progress>`;
  }
};
__decorate([
  property({type: Boolean})
], OscdWaiter.prototype, "waiting", 2);
OscdWaiter = __decorate([
  customElement("oscd-waiter")
], OscdWaiter);
