import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { customElement, html, LitElement, property, } from '../../../_snowpack/pkg/lit-element.js';
import '../../../_snowpack/pkg/@material/mwc-linear-progress.js';
let OscdWaiter = class OscdWaiter extends LitElement {
    async onPendingState(e) {
        this.waiting = true;
        this.work.add(e.detail.promise);
        this.workDone = Promise.allSettled(this.work);
        await e.detail.promise.catch(reason => console.warn(reason));
        this.work.delete(e.detail.promise);
        this.waiting = this.work.size > 0;
    }
    constructor() {
        super();
        /** Whether the element is currently waiting for some async work. */
        this.waiting = false;
        this.work = new Set();
        /** A promise which resolves once all currently pending work is done. */
        this.workDone = Promise.allSettled(this.work);
        this.onPendingState = this.onPendingState.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('pending-state', this.onPendingState);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('pending-state', this.onPendingState);
    }
    render() {
        return html `<slot></slot>
      <mwc-linear-progress
        .closed=${!this.waiting}
        indeterminate
      ></mwc-linear-progress>`;
    }
};
__decorate([
    property({ type: Boolean })
], OscdWaiter.prototype, "waiting", void 0);
OscdWaiter = __decorate([
    customElement('oscd-waiter')
], OscdWaiter);
export { OscdWaiter };
//# sourceMappingURL=Waiter.js.map