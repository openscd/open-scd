import { html, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { translate } from "lit-translate";
import { typeMaxLength } from "../../../wizards/foundation/p-types.js";
import { typeDescriptiveNameKeys, typePattern } from "../foundation/p-types.js";


/**
 * Create a wizard-textfield element for the Create wizard.
 * @param pType - The type of P a Text Field has to be created for.
 * @returns - A Text Field created for a specific type for the Create wizard.
 */
export function createCreateTextField(pType: string): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    maxLength="${ifDefined(typeMaxLength[pType])}"
    helper="${translate(typeDescriptiveNameKeys[pType])}"
  ></wizard-textfield>`
}