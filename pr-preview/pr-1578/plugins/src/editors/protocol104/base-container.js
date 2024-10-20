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
import {LitElement, property} from "../../../../_snowpack/pkg/lit-element.js";
export class Base104Container extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
  }
}
__decorate([
  property()
], Base104Container.prototype, "doc", 2);
__decorate([
  property({type: Number})
], Base104Container.prototype, "editCount", 2);
