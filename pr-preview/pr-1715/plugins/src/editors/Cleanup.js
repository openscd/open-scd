"use strict";
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
import {css, html, LitElement, property} from "../../../_snowpack/pkg/lit-element.js";
import {styles} from "./templates/foundation.js";
import "./cleanup/datasets-container.js";
import "./cleanup/control-blocks-container.js";
import "./cleanup/datatypes-container.js";
export default class Cleanup extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
  }
  render() {
    return html`
      <div class="cleanup">
        <cleanup-datasets .editCount=${this.editCount} .doc=${this.doc}></cleanup-datasets>
        <cleanup-control-blocks .editCount=${this.editCount} .doc=${this.doc}></cleanup-control-blocks>
        <cleanup-data-types .editCount=${this.editCount} .doc=${this.doc}></cleanup-data-types>
      </div>
    `;
  }
}
Cleanup.styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    @media (max-width: 799px) {
      .cleanup {
        flex-direction: column;
      }
    }

    @media (min-width: 800px) {
      .cleanup {
        max-height: 60vh;
      }
    }

    cleanup-datasets, cleanup-control-blocks, cleanup-data-types {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }

    .cleanup {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }
  }
  `;
__decorate([
  property()
], Cleanup.prototype, "doc", 2);
__decorate([
  property({type: Number})
], Cleanup.prototype, "editCount", 2);
