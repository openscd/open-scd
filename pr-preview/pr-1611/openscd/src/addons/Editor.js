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
import {newEditCompletedEvent, newEditEvent} from "../../../_snowpack/link/packages/core/dist/foundation.js";
import {
  property,
  LitElement,
  customElement,
  html
} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {newLogEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js";
import {newValidateEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/validation.js";
import {
  isComplex,
  isInsert,
  isNamespaced,
  isRemove,
  isUpdate
} from "../../../_snowpack/link/packages/core/dist/foundation.js";
import {convertEditV1toV2} from "./editor/edit-v1-to-v2-converter.js";
export let OscdEditor = class extends LitElement {
  constructor() {
    super(...arguments);
    this.doc = null;
    this.docName = "";
    this.docId = "";
  }
  getLogText(edit) {
    if (isInsert(edit)) {
      const name = edit.node instanceof Element ? edit.node.tagName : get("editing.node");
      return {title: get("editing.created", {name})};
    } else if (isUpdate(edit)) {
      const name = edit.element.tagName;
      return {title: get("editing.updated", {name})};
    } else if (isRemove(edit)) {
      const name = edit.node instanceof Element ? edit.node.tagName : get("editing.node");
      return {title: get("editing.deleted", {name})};
    } else if (isComplex(edit)) {
      const message = edit.map((e) => this.getLogText(e)).map(({title}) => title).join(", ");
      return {title: get("editing.complex"), message};
    }
    return {title: ""};
  }
  onAction(event) {
    const edit = convertEditV1toV2(event.detail.action);
    const initiator = event.detail.initiator;
    this.host.dispatchEvent(newEditEvent(edit, initiator));
  }
  async onOpenDoc(event) {
    this.doc = event.detail.doc;
    this.docName = event.detail.docName;
    this.docId = event.detail.docId ?? "";
    await this.updateComplete;
    this.dispatchEvent(newValidateEvent());
    this.dispatchEvent(newLogEvent({
      kind: "info",
      title: get("openSCD.loaded", {name: this.docName})
    }));
  }
  handleOpenDoc({detail: {docName, doc}}) {
    this.doc = doc;
    this.docName = docName;
  }
  connectedCallback() {
    super.connectedCallback();
    this.host.addEventListener("editor-action", this.onAction.bind(this));
    this.host.addEventListener("oscd-edit", (event) => this.handleEditEvent(event));
    this.host.addEventListener("open-doc", this.onOpenDoc);
    this.host.addEventListener("oscd-open", this.handleOpenDoc);
  }
  render() {
    return html`<slot></slot>`;
  }
  async handleEditEvent(event) {
    if (isOpenEnergyEditEvent(event)) {
      event = convertOpenEnergyEditEventToEditEvent(event);
    }
    const edit = event.detail.edit;
    const undoEdit = handleEdit(edit);
    this.dispatchEvent(newEditCompletedEvent(event.detail.edit, event.detail.initiator));
    const shouldCreateHistoryEntry = event.detail.initiator !== "redo" && event.detail.initiator !== "undo";
    if (shouldCreateHistoryEntry) {
      const {title, message} = this.getLogText(edit);
      this.dispatchEvent(newLogEvent({
        kind: "action",
        title,
        message,
        redo: edit,
        undo: undoEdit
      }));
    }
    await this.updateComplete;
    this.dispatchEvent(newValidateEvent());
  }
};
__decorate([
  property({attribute: false})
], OscdEditor.prototype, "doc", 2);
__decorate([
  property({type: String})
], OscdEditor.prototype, "docName", 2);
__decorate([
  property({type: String})
], OscdEditor.prototype, "docId", 2);
__decorate([
  property({
    type: Object
  })
], OscdEditor.prototype, "host", 2);
OscdEditor = __decorate([
  customElement("oscd-editor")
], OscdEditor);
function handleEdit(edit) {
  if (isInsert(edit))
    return handleInsert(edit);
  if (isUpdate(edit))
    return handleUpdate(edit);
  if (isRemove(edit))
    return handleRemove(edit);
  if (isComplex(edit))
    return edit.map(handleEdit).reverse();
  return [];
}
function localAttributeName(attribute) {
  return attribute.includes(":") ? attribute.split(":", 2)[1] : attribute;
}
function handleInsert({
  parent,
  node,
  reference
}) {
  try {
    const {parentNode, nextSibling} = node;
    if (!parent.contains(reference)) {
      reference = null;
    }
    parent.insertBefore(node, reference);
    if (parentNode)
      return {
        node,
        parent: parentNode,
        reference: nextSibling
      };
    return {node};
  } catch (e) {
    return [];
  }
}
function handleUpdate({element, attributes}) {
  const oldAttributes = {...attributes};
  Object.entries(attributes).reverse().forEach(([name, value]) => {
    let oldAttribute;
    if (isNamespaced(value))
      oldAttribute = {
        value: element.getAttributeNS(value.namespaceURI, localAttributeName(name)),
        namespaceURI: value.namespaceURI
      };
    else
      oldAttribute = element.getAttributeNode(name)?.namespaceURI ? {
        value: element.getAttribute(name),
        namespaceURI: element.getAttributeNode(name).namespaceURI
      } : element.getAttribute(name);
    oldAttributes[name] = oldAttribute;
  });
  for (const entry of Object.entries(attributes)) {
    try {
      const [attribute, value] = entry;
      if (isNamespaced(value)) {
        if (value.value === null)
          element.removeAttributeNS(value.namespaceURI, localAttributeName(attribute));
        else
          element.setAttributeNS(value.namespaceURI, attribute, value.value);
      } else if (value === null)
        element.removeAttribute(attribute);
      else
        element.setAttribute(attribute, value);
    } catch (e) {
      delete oldAttributes[entry[0]];
    }
  }
  return {
    element,
    attributes: oldAttributes
  };
}
function handleRemove({node}) {
  const {parentNode: parent, nextSibling: reference} = node;
  node.parentNode?.removeChild(node);
  if (parent)
    return {
      node,
      parent,
      reference
    };
  return [];
}
function isOpenEnergyEditEvent(event) {
  const eventDetail = event.detail;
  return isComplex(eventDetail) || isInsert(eventDetail) || isUpdate(eventDetail) || isRemove(eventDetail);
}
function convertOpenEnergyEditEventToEditEvent(event) {
  const eventDetail = event.detail;
  return newEditEvent(eventDetail);
}
