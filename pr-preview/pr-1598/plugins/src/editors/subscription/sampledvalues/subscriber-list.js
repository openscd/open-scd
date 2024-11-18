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
  property
} from "../../../../../_snowpack/pkg/lit-element.js";
import {nothing} from "../../../../../_snowpack/pkg/lit-html.js";
import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import "../../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../../openscd/src/filtered-list.js";
import {
  identity
} from "../../../../../openscd/src/foundation.js";
import {
  createElement
} from "../../../../../_snowpack/link/packages/xml/dist/index.js";
import {
  newActionEvent
} from "../../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {
  newSmvSubscriptionEvent
} from "./foundation.js";
import {emptyInputsDeleteActions} from "../../../../../openscd/src/foundation/ied.js";
import {
  canCreateValidExtRef,
  createExtRefElement,
  existExtRef,
  getExistingSupervision,
  getExtRef,
  getFirstSubscribedExtRef,
  instantiateSubscriptionSupervision,
  removeSubscriptionSupervision,
  styles,
  SubscriberListContainer,
  SubscribeStatus,
  View
} from "../foundation.js";
let view = View.PUBLISHER;
export let SubscriberList = class extends SubscriberListContainer {
  constructor() {
    super();
    this.editCount = -1;
    this.onIEDSelectEvent = this.onIEDSelectEvent.bind(this);
    this.onSmvSelectEvent = this.onSmvSelectEvent.bind(this);
    this.onIEDSubscriptionEvent = this.onIEDSubscriptionEvent.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    const parentDiv = this.closest(".container");
    if (parentDiv) {
      parentDiv.addEventListener("ied-select", this.onIEDSelectEvent);
      parentDiv.addEventListener("smv-select", this.onSmvSelectEvent);
      parentDiv.addEventListener("smv-subscription", this.onIEDSubscriptionEvent);
      parentDiv.addEventListener("view", this.onViewChange);
    }
  }
  async onIEDSelectEvent(event) {
    if (!event.detail.ied)
      return;
    this.currentSelectedIed = event.detail.ied;
    this.resetElements();
    const subscribedInputs = this.currentSelectedIed.querySelectorAll(`LN0 > Inputs, LN > Inputs`);
    Array.from(this.doc.querySelectorAll("SampledValueControl")).filter((cb) => cb.hasAttribute("datSet")).forEach((control) => {
      const ied = control.closest("IED");
      if (ied.getAttribute("name") == this.currentSelectedIed?.getAttribute("name"))
        return;
      if (subscribedInputs.length == 0) {
        this.availableElements.push({element: control});
        return;
      }
      let numberOfLinkedExtRefs = 0;
      const dataSet = ied.querySelector(`DataSet[name="${control.getAttribute("datSet")}"]`);
      if (!dataSet)
        return;
      dataSet.querySelectorAll("FCDA").forEach((fcda) => {
        subscribedInputs.forEach((inputs) => {
          if (getExtRef(inputs, fcda, this.currentSelectedSmvControl)) {
            numberOfLinkedExtRefs++;
          }
        });
      });
      if (numberOfLinkedExtRefs == 0) {
        this.availableElements.push({element: control});
        return;
      }
      if (numberOfLinkedExtRefs >= dataSet.querySelectorAll("FCDA").length) {
        this.subscribedElements.push({element: control});
      } else {
        this.availableElements.push({element: control, partial: true});
      }
    });
    this.requestUpdate();
  }
  async onSmvSelectEvent(event) {
    if (!event.detail.dataset || !event.detail.smvControl)
      return;
    this.currentSelectedSmvControl = event.detail.smvControl;
    this.currentUsedDataset = event.detail.dataset;
    this.currentSmvIedName = this.currentSelectedSmvControl?.closest("IED")?.getAttribute("name");
    this.subscribedElements = [];
    this.availableElements = [];
    Array.from(this.doc.querySelectorAll(":root > IED")).filter((ied) => ied.getAttribute("name") != this.currentSmvIedName).forEach((ied) => {
      const inputElements = ied.querySelectorAll(`LN0 > Inputs, LN > Inputs`);
      let numberOfLinkedExtRefs = 0;
      if (!inputElements) {
        this.availableElements.push({element: ied});
        return;
      }
      this.currentUsedDataset.querySelectorAll("FCDA").forEach((fcda) => {
        inputElements.forEach((inputs) => {
          if (getExtRef(inputs, fcda, this.currentSelectedSmvControl)) {
            numberOfLinkedExtRefs++;
          }
        });
      });
      if (numberOfLinkedExtRefs == 0) {
        this.availableElements.push({element: ied});
        return;
      }
      if (numberOfLinkedExtRefs >= this.currentUsedDataset.querySelectorAll("FCDA").length) {
        this.subscribedElements.push({element: ied});
      } else {
        this.availableElements.push({element: ied, partial: true});
      }
    });
    this.requestUpdate();
  }
  async onIEDSubscriptionEvent(event) {
    let iedToSubscribe = event.detail.element;
    if (view == View.SUBSCRIBER) {
      const dataSetName = event.detail.element.getAttribute("datSet");
      this.currentUsedDataset = event.detail.element.parentElement?.querySelector(`DataSet[name="${dataSetName}"]`);
      this.currentSelectedSmvControl = event.detail.element;
      this.currentSmvIedName = event.detail.element.closest("IED")?.getAttribute("name");
      iedToSubscribe = this.currentSelectedIed;
    }
    switch (event.detail.subscribeStatus) {
      case SubscribeStatus.Full: {
        this.unsubscribe(iedToSubscribe);
        break;
      }
      case SubscribeStatus.Partial: {
        this.subscribe(iedToSubscribe);
        break;
      }
      case SubscribeStatus.None: {
        this.subscribe(iedToSubscribe);
        break;
      }
    }
  }
  async onViewChange(event) {
    view = event.detail.view;
    this.currentSelectedIed = void 0;
    this.currentSelectedSmvControl = void 0;
    this.resetElements();
    this.requestUpdate();
  }
  async subscribe(ied) {
    if (!ied.querySelector("LN0"))
      return;
    let inputsElement = ied.querySelector("LN0 > Inputs");
    if (!inputsElement)
      inputsElement = createElement(ied.ownerDocument, "Inputs", {});
    const complexAction = {
      actions: [],
      title: get(`subscription.connect`)
    };
    this.currentUsedDataset.querySelectorAll("FCDA").forEach((fcda) => {
      if (!existExtRef(inputsElement, fcda, this.currentSelectedSmvControl) && canCreateValidExtRef(fcda, this.currentSelectedSmvControl)) {
        const extRef = createExtRefElement(this.currentSelectedSmvControl, fcda);
        if (inputsElement?.parentElement)
          complexAction.actions.push({
            new: {parent: inputsElement, element: extRef}
          });
        else
          inputsElement?.appendChild(extRef);
      }
    });
    const supervisionActions = instantiateSubscriptionSupervision(this.currentSelectedSmvControl, ied);
    if (inputsElement.parentElement) {
      complexAction.actions.concat(supervisionActions);
    } else {
      const inputAction = [
        {
          new: {parent: ied.querySelector("LN0"), element: inputsElement}
        }
      ];
      complexAction.actions = inputAction.concat(supervisionActions);
    }
    this.dispatchEvent(newActionEvent(complexAction));
  }
  async unsubscribe(ied) {
    const actions = [];
    ied.querySelectorAll("LN0 > Inputs, LN > Inputs").forEach((inputs) => {
      this.currentUsedDataset.querySelectorAll("FCDA").forEach((fcda) => {
        const extRef = getExtRef(inputs, fcda, this.currentSelectedSmvControl);
        if (extRef)
          actions.push({old: {parent: inputs, element: extRef}});
      });
    });
    actions.push(...emptyInputsDeleteActions(actions));
    actions.push(...removeSubscriptionSupervision(this.currentSelectedSmvControl, ied));
    this.dispatchEvent(newActionEvent({
      title: get("subscription.disconnect"),
      actions
    }));
  }
  renderSubscriber(status, element) {
    let firstSubscribedExtRef = null;
    let supervisionNode = null;
    if (status !== SubscribeStatus.None) {
      if (view === View.PUBLISHER) {
        firstSubscribedExtRef = getFirstSubscribedExtRef(this.currentSelectedSmvControl, element);
        supervisionNode = getExistingSupervision(firstSubscribedExtRef);
      } else {
        firstSubscribedExtRef = getFirstSubscribedExtRef(element, this.currentSelectedIed);
        supervisionNode = getExistingSupervision(firstSubscribedExtRef);
      }
    }
    return html` <mwc-list-item
      @click=${() => {
      this.dispatchEvent(newSmvSubscriptionEvent(element, status ?? SubscribeStatus.None));
    }}
      graphic="avatar"
      ?hasMeta=${supervisionNode !== null}
    >
      <span
        >${view == View.PUBLISHER ? element.getAttribute("name") : element.getAttribute("name") + ` (${element.closest("IED")?.getAttribute("name")})`}</span
      >
      <mwc-icon slot="graphic"
        >${status == SubscribeStatus.Full ? html`clear` : html`add`}</mwc-icon
      >
      ${supervisionNode !== null ? html`<mwc-icon title="${identity(supervisionNode)}" slot="meta"
            >monitor_heart</mwc-icon
          >` : nothing}
    </mwc-list-item>`;
  }
  renderUnSubscribers(elements) {
    return html`<mwc-list-item
        noninteractive
        value="${elements.map((element) => {
      const id = identity(element.element);
      return typeof id === "string" ? id : "";
    }).join(" ")}"
      >
        <span>${get("subscription.subscriber.availableToSubscribe")}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${elements.length > 0 ? elements.map((element) => this.renderSubscriber(SubscribeStatus.None, element.element)) : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${get("subscription.none")}</span>
          </mwc-list-item>`}`;
  }
  renderPartiallySubscribers(elements) {
    return html`<mwc-list-item
        noninteractive
        value="${elements.map((element) => {
      const id = identity(element.element);
      return typeof id === "string" ? id : "";
    }).join(" ")}"
      >
        <span>${get("subscription.subscriber.partiallySubscribed")}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${elements.length > 0 ? elements.map((element) => this.renderSubscriber(SubscribeStatus.Partial, element.element)) : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${get("subscription.none")}</span>
          </mwc-list-item>`}`;
  }
  renderFullSubscribers() {
    return html`<mwc-list-item
        noninteractive
        value="${this.subscribedElements.map((element) => {
      const id = identity(element.element);
      return typeof id === "string" ? id : "";
    }).join(" ")}"
      >
        <span>${get("subscription.subscriber.subscribed")}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${this.subscribedElements.length > 0 ? this.subscribedElements.map((element) => this.renderSubscriber(SubscribeStatus.Full, element.element)) : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${get("subscription.none")}</span>
          </mwc-list-item>`}`;
  }
  renderTitle() {
    const gseControlName = this.currentSelectedSmvControl?.getAttribute("name") ?? void 0;
    return view == View.PUBLISHER ? html`<h1>
          ${get("subscription.smv.publisher.subscriberTitle", {
      selected: gseControlName ? this.currentSmvIedName + " > " + gseControlName : "Sampled Value"
    })}
        </h1>` : html`<h1>
          ${get("subscription.smv.subscriber.publisherTitle", {
      selected: this.currentSelectedIed ? this.currentSelectedIed.getAttribute("name") : "IED"
    })}
        </h1>`;
  }
  firstUpdated() {
    this.currentSelectedIed = void 0;
  }
  render() {
    return html`
      <section tabindex="0">
        ${this.renderTitle()}
        ${this.availableElements.length != 0 || this.subscribedElements.length != 0 ? html`<div class="wrapper">
              <filtered-list>
                ${this.renderFullSubscribers()}
                ${this.renderPartiallySubscribers(this.availableElements.filter((element) => element.partial))}
                ${this.renderUnSubscribers(this.availableElements.filter((element) => !element.partial))}
              </filtered-list>
            </div>` : html`<mwc-list>
              <mwc-list-item noninteractive>
                <span>${view == View.PUBLISHER ? get("subscription.subscriber.noControlBlockSelected") : get("subscription.subscriber.noIedSelected")}</span>
              </mwc-list-item>
            </mwc-list>
          </div>`}
      </section>
    `;
  }
};
SubscriberList.styles = css`
    ${styles}

    .wrapper {
      height: 100vh;
      overflow-y: scroll;
    }
  `;
__decorate([
  property({attribute: false})
], SubscriberList.prototype, "doc", 2);
__decorate([
  property({type: Number})
], SubscriberList.prototype, "editCount", 2);
SubscriberList = __decorate([
  customElement("subscriber-list-smv")
], SubscriberList);
