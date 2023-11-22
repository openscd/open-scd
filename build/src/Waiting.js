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
import {html, property} from "../_snowpack/pkg/lit-element.js";
import "../_snowpack/pkg/@material/mwc-circular-progress-four-color.js";
import {
  ifImplemented
} from "./foundation.js";
export function Waiting(Base) {
  class WaitingElement extends Base {
    constructor(...args) {
      super(...args);
      this.waiting = false;
      this.work = new Set();
      this.workDone = Promise.allSettled(this.work);
      this.onPendingState = this.onPendingState.bind(this);
      this.addEventListener("pending-state", this.onPendingState);
    }
    async onPendingState(e) {
      this.waiting = true;
      this.work.add(e.detail.promise);
      this.workDone = Promise.allSettled(this.work);
      await e.detail.promise.catch((reason) => console.warn(reason));
      this.work.delete(e.detail.promise);
      this.waiting = this.work.size > 0;
    }
    render() {
      return html`${ifImplemented(super.render())}
        <mwc-circular-progress-four-color
          .closed=${!this.waiting}
          indeterminate
        ></mwc-circular-progress-four-color>`;
    }
  }
  __decorate([
    property({type: Boolean})
  ], WaitingElement.prototype, "waiting", 2);
  return WaitingElement;
}
