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
import {property} from "../../_snowpack/pkg/lit-element.js";
import {get} from "../../_snowpack/pkg/lit-translate.js";
import {newLogEvent} from "../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js";
import {newValidateEvent} from "../../_snowpack/link/packages/core/dist/foundation/deprecated/validation.js";
import {
  isCreate,
  isDelete,
  isMove,
  isSimple,
  isReplace,
  isUpdate
} from "../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {
  getReference
} from "./foundation.js";
export function Editing(Base) {
  class EditingElement extends Base {
    constructor(...args) {
      super(...args);
      this.doc = null;
      this.docName = "";
      this.docId = "";
      this.addEventListener("editor-action", this.onAction);
      this.addEventListener("open-doc", this.onOpenDoc);
      this.addEventListener("oscd-open", this.handleOpenDoc);
    }
    checkCreateValidity(create) {
      if (create.checkValidity !== void 0)
        return create.checkValidity();
      if (!(create.new.element instanceof Element) || !(create.new.parent instanceof Element))
        return true;
      const invalidNaming = create.new.element.hasAttribute("name") && Array.from(create.new.parent.children).some((elm) => elm.tagName === create.new.element.tagName && elm.getAttribute("name") === create.new.element.getAttribute("name"));
      if (invalidNaming) {
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("editing.error.create", {
            name: create.new.element.tagName
          }),
          message: get("editing.error.nameClash", {
            parent: create.new.parent instanceof HTMLElement ? create.new.parent.tagName : "Document",
            child: create.new.element.tagName,
            name: create.new.element.getAttribute("name")
          })
        }));
        return false;
      }
      const invalidId = create.new.element.hasAttribute("id") && Array.from(create.new.parent.ownerDocument.querySelectorAll("LNodeType, DOType, DAType, EnumType")).some((elm) => elm.getAttribute("id") === create.new.element.getAttribute("id"));
      if (invalidId) {
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("editing.error.create", {
            name: create.new.element.tagName
          }),
          message: get("editing.error.idClash", {
            id: create.new.element.getAttribute("id")
          })
        }));
        return false;
      }
      return true;
    }
    onCreate(action) {
      if (!this.checkCreateValidity(action))
        return false;
      if (action.new.reference === void 0 && action.new.element instanceof Element && action.new.parent instanceof Element)
        action.new.reference = getReference(action.new.parent, action.new.element.tagName);
      else
        action.new.reference = action.new.reference ?? null;
      action.new.parent.insertBefore(action.new.element, action.new.reference);
      return true;
    }
    logCreate(action) {
      const name = action.new.element instanceof Element ? action.new.element.tagName : get("editing.node");
      this.dispatchEvent(newLogEvent({
        kind: "action",
        title: get("editing.created", {name}),
        action
      }));
    }
    onDelete(action) {
      if (!action.old.reference)
        action.old.reference = action.old.element.nextSibling;
      if (action.old.element.parentNode !== action.old.parent)
        return false;
      action.old.parent.removeChild(action.old.element);
      return true;
    }
    logDelete(action) {
      const name = action.old.element instanceof Element ? action.old.element.tagName : get("editing.node");
      this.dispatchEvent(newLogEvent({
        kind: "action",
        title: get("editing.deleted", {name}),
        action
      }));
    }
    checkMoveValidity(move) {
      if (move.checkValidity !== void 0)
        return move.checkValidity();
      const invalid = move.old.element.hasAttribute("name") && move.new.parent !== move.old.parent && Array.from(move.new.parent.children).some((elm) => elm.tagName === move.old.element.tagName && elm.getAttribute("name") === move.old.element.getAttribute("name"));
      if (invalid)
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("editing.error.move", {
            name: move.old.element.tagName
          }),
          message: get("editing.error.nameClash", {
            parent: move.new.parent.tagName,
            child: move.old.element.tagName,
            name: move.old.element.getAttribute("name")
          })
        }));
      return !invalid;
    }
    onMove(action) {
      if (!this.checkMoveValidity(action))
        return false;
      if (!action.old.reference)
        action.old.reference = action.old.element.nextSibling;
      if (action.new.reference === void 0)
        action.new.reference = getReference(action.new.parent, action.old.element.tagName);
      action.new.parent.insertBefore(action.old.element, action.new.reference);
      return true;
    }
    logMove(action) {
      this.dispatchEvent(newLogEvent({
        kind: "action",
        title: get("editing.moved", {
          name: action.old.element.tagName
        }),
        action
      }));
    }
    checkReplaceValidity(replace) {
      if (replace.checkValidity !== void 0)
        return replace.checkValidity();
      const invalidNaming = replace.new.element.hasAttribute("name") && replace.new.element.getAttribute("name") !== replace.old.element.getAttribute("name") && Array.from(replace.old.element.parentElement?.children ?? []).some((elm) => elm.tagName === replace.new.element.tagName && elm.getAttribute("name") === replace.new.element.getAttribute("name"));
      if (invalidNaming) {
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("editing.error.update", {
            name: replace.new.element.tagName
          }),
          message: get("editing.error.nameClash", {
            parent: replace.old.element.parentElement.tagName,
            child: replace.new.element.tagName,
            name: replace.new.element.getAttribute("name")
          })
        }));
        return false;
      }
      const invalidId = replace.new.element.hasAttribute("id") && replace.new.element.getAttribute("id") !== replace.old.element.getAttribute("id") && Array.from(replace.new.element.ownerDocument.querySelectorAll("LNodeType, DOType, DAType, EnumType")).some((elm) => elm.getAttribute("id") === replace.new.element.getAttribute("id"));
      if (invalidId) {
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("editing.error.update", {
            name: replace.new.element.tagName
          }),
          message: get("editing.error.idClash", {
            id: replace.new.element.getAttribute("id")
          })
        }));
        return false;
      }
      return true;
    }
    onReplace(action) {
      if (!this.checkReplaceValidity(action))
        return false;
      action.new.element.append(...Array.from(action.old.element.children));
      action.old.element.replaceWith(action.new.element);
      return true;
    }
    logUpdate(action) {
      const name = isReplace(action) ? action.new.element.tagName : action.element.tagName;
      this.dispatchEvent(newLogEvent({
        kind: "action",
        title: get("editing.updated", {
          name
        }),
        action
      }));
    }
    checkUpdateValidity(update) {
      if (update.checkValidity !== void 0)
        return update.checkValidity();
      if (update.oldAttributes["name"] !== update.newAttributes["name"]) {
        const invalidNaming = Array.from(update.element.parentElement?.children ?? []).some((elm) => elm.tagName === update.element.tagName && elm.getAttribute("name") === update.newAttributes["name"]);
        if (invalidNaming) {
          this.dispatchEvent(newLogEvent({
            kind: "error",
            title: get("editing.error.update", {
              name: update.element.tagName
            }),
            message: get("editing.error.nameClash", {
              parent: update.element.parentElement.tagName,
              child: update.element.tagName,
              name: update.newAttributes["name"]
            })
          }));
          return false;
        }
      }
      const invalidId = update.newAttributes["id"] && Array.from(update.element.ownerDocument.querySelectorAll("LNodeType, DOType, DAType, EnumType")).some((elm) => elm.getAttribute("id") === update.newAttributes["id"]);
      if (invalidId) {
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("editing.error.update", {
            name: update.element.tagName
          }),
          message: get("editing.error.idClash", {
            id: update.newAttributes["id"]
          })
        }));
        return false;
      }
      return true;
    }
    onUpdate(action) {
      if (!this.checkUpdateValidity(action))
        return false;
      Array.from(action.element.attributes).forEach((attr) => action.element.removeAttributeNode(attr));
      Object.entries(action.newAttributes).forEach(([key, value]) => {
        if (value !== null && value !== void 0)
          action.element.setAttribute(key, value);
      });
      return true;
    }
    onSimpleAction(action) {
      if (isMove(action))
        return this.onMove(action);
      else if (isCreate(action))
        return this.onCreate(action);
      else if (isDelete(action))
        return this.onDelete(action);
      else if (isReplace(action))
        return this.onReplace(action);
      else if (isUpdate(action))
        return this.onUpdate(action);
    }
    logSimpleAction(action) {
      if (isMove(action))
        this.logMove(action);
      else if (isCreate(action))
        this.logCreate(action);
      else if (isDelete(action))
        this.logDelete(action);
      else if (isReplace(action))
        this.logUpdate(action);
      else if (isUpdate(action))
        this.logUpdate(action);
    }
    async onAction(event) {
      if (isSimple(event.detail.action)) {
        if (this.onSimpleAction(event.detail.action))
          this.logSimpleAction(event.detail.action);
      } else if (event.detail.action.actions.length > 0) {
        event.detail.action.actions.forEach((element) => this.onSimpleAction(element));
        this.dispatchEvent(newLogEvent({
          kind: "action",
          title: event.detail.action.title,
          action: event.detail.action
        }));
      } else
        return;
      if (!this.doc)
        return;
      await this.updateComplete;
      this.dispatchEvent(newValidateEvent());
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
  }
  __decorate([
    property({attribute: false})
  ], EditingElement.prototype, "doc", 2);
  __decorate([
    property({type: String})
  ], EditingElement.prototype, "docName", 2);
  __decorate([
    property({type: String})
  ], EditingElement.prototype, "docId", 2);
  return EditingElement;
}
