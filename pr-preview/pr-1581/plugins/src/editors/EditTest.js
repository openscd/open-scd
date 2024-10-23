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
import {newEditEvent} from "../../../_snowpack/link/packages/core/dist/foundation.js";
import {css, html, LitElement, property} from "../../../_snowpack/pkg/lit-element.js";
export default class EditTest extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
  }
  create() {
    console.log("Create");
    const substation = this.doc.querySelector("Substation");
    const element = this.doc.createElement("VoltageLevel");
    element.setAttribute("name", "Test_1");
    const event = newEditEvent({
      parent: substation,
      node: element
    });
    this.dispatchEvent(event);
  }
  remove() {
    console.log("Remove");
    const testVL = this.doc.querySelector('VoltageLevel[name="Test_1"]');
    if (testVL) {
      const event = newEditEvent({
        node: testVL
      });
      this.dispatchEvent(event);
    }
  }
  edit() {
    const testVL = this.doc.querySelector('VoltageLevel[name="Test_1"]');
    if (testVL) {
      const event = newEditEvent({
        element: testVL,
        attributes: {
          test: "new attribute created"
        }
      });
      this.dispatchEvent(event);
    }
  }
  multiedit() {
    const testVL = this.doc.querySelector('VoltageLevel[name="Test_1"]');
    if (testVL) {
      const event = newEditEvent([
        {
          element: testVL,
          attributes: {
            event1: "new data 1"
          }
        },
        {
          element: testVL,
          attributes: {
            event2: "new data 2"
          }
        }
      ]);
      this.dispatchEvent(event);
    }
  }
  render() {
    return html`
        <div class="edit">
          <h2>Edittest</h2>
          <div>
            <mwc-button label="Create" @click=${() => this.create()}></mwc-button>
            <mwc-button label="Remove" @click=${() => this.remove()}></mwc-button>
            <mwc-button label="Edit" @click=${() => this.edit()}></mwc-button>
            <mwc-button label="Multiedit" @click=${() => this.multiedit()}></mwc-button>
          </div>
        </div>
      `;
  }
}
EditTest.styles = css`
    :host {
      width: 100vw;
    }

    .edit {
        padding: 48px;
    }
  }`;
__decorate([
  property()
], EditTest.prototype, "doc", 2);
__decorate([
  property({type: Number})
], EditTest.prototype, "editCount", 2);
