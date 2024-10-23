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
import {LitElement, property} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {
  newIssueEvent,
  newLogEvent
} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js";
import {
  getSchema,
  isLoadSchemaResult,
  isValidationError,
  isValidationResult
} from "../../../openscd/src/schemas.js";
const validators = {};
export default class ValidateSchema extends LitElement {
  async getValidator(xsd, xsdName) {
    if (!window.Worker)
      throw new Error(get("validator.schema.fatal"));
    if (validators[xsdName])
      return validators[xsdName];
    const worker = new Worker("public/js/worker.js");
    async function validate(xml, xmlName) {
      return new Promise((resolve) => {
        worker.addEventListener("message", (e) => {
          if (isValidationResult(e.data) && e.data.file === xmlName)
            resolve(e.data);
        });
        worker.postMessage({content: xml, name: xmlName});
      });
    }
    validators[xsdName] = validate;
    return new Promise((resolve, reject) => {
      worker.addEventListener("message", (e) => {
        if (isLoadSchemaResult(e.data)) {
          if (e.data.loaded)
            resolve(validate);
          else
            reject(get("validator.schema.loadEror", {name: e.data.file}));
        } else if (isValidationError(e.data)) {
          const parts = e.data.message.split(": ", 2);
          const description = parts[1] ? parts[1] : parts[0];
          const qualifiedTag = parts[1] ? " (" + parts[0] + ")" : "";
          this.dispatchEvent(newIssueEvent({
            title: description,
            validatorId: this.pluginId,
            message: e.data.file + ":" + e.data.line + " " + e.data.node + " " + e.data.part + qualifiedTag
          }));
        } else if (!isValidationResult(e.data)) {
          this.dispatchEvent(newLogEvent({
            title: get("validator.schema.fatal"),
            kind: "error",
            message: e.data
          }));
        }
      });
      worker.postMessage({content: xsd, name: xsdName});
    });
  }
  async validate() {
    const fileName = this.docName;
    let version = "2007";
    let revision = "B";
    let release = "1";
    if (this.doc.documentElement)
      [version, revision, release] = [
        this.doc.documentElement.getAttribute("version") ?? "",
        this.doc.documentElement.getAttribute("revision") ?? "",
        this.doc.documentElement.getAttribute("release") ?? ""
      ];
    const result = await this.getValidator(getSchema(version, revision, release), "SCL" + version + revision + release + ".xsd").then((validator) => validator(new XMLSerializer().serializeToString(this.doc), fileName));
    if (!result.valid) {
      this.dispatchEvent(newLogEvent({
        kind: "warning",
        title: get("validator.schema.invalid", {name: result.file})
      }));
      return;
    }
    this.dispatchEvent(newLogEvent({
      kind: "info",
      title: get("validator.schema.valid", {name: result.file})
    }));
    this.dispatchEvent(newIssueEvent({
      validatorId: this.pluginId,
      title: get("validator.schema.valid", {name: result.file})
    }));
  }
}
__decorate([
  property()
], ValidateSchema.prototype, "doc", 2);
__decorate([
  property()
], ValidateSchema.prototype, "docName", 2);
__decorate([
  property()
], ValidateSchema.prototype, "pluginId", 2);
